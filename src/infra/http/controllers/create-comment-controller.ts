import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'

import { CreateCommentUseCase } from '@/domain/projects/application/use-cases/create-comment'
import { WrongCredentialsError } from '@/domain/projects/application/use-cases/errors/wrong-credentials'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserJwtPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from './pipes/zod-validation-pipe'

const bodySchema = z.object({
  argument: z.string(),
  // position: z.union([z.literal('AGREES'), z.literal('DISAGREES')]),
  postId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Controller('create-comment')
export class CreateCommentController {
  constructor(private createCommentUseCase: CreateCommentUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() user: UserJwtPayload,
    @Body(bodyValidationPipe) body: BodySchema,
  ) {
    const {
      argument,
      // position,
      postId,
    } = body
    const result = await this.createCommentUseCase.execute({
      argument,
      // position,
      postId,
      publisherId: user.sub,
    })
    if (result.type === 'failure') {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException({
            errors: [
              {
                field: 'id',
                message: error.message,
              },
            ],
          })
        default:
          throw new BadRequestException({
            errors: [
              {
                field: null,
                message: error.message,
              },
            ],
          })
      }
    }
  }
}
