import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod' // usado para validar o esquema de dados da requisição antes de passar para lógica de negócios

import { CreatePostUseCase } from '@/domain/projects/application/use-cases/create-post' // lógica de negocio de criar post
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserJwtPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/controllers/pipes/zod-validation-pipe' // usado para validar o esquema de dados da requisição antes de passar para lógica de negócios

const bodySchema = z.object({
  question: z.string(),
  description: z.string(),
  source: z.string().url('It must be a valid link'),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Controller('/create-post')
export class CreatePostController {
  constructor(private useCase: CreatePostUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() user: UserJwtPayload,
    @Body(bodyValidationPipe) body: BodySchema,
  ) {
    const { question, description, source } = body

    const result = await this.useCase.execute({
      publisherId: user.sub,
      question,
      description,
      source,
    })

    if (result.type === 'failure') {
      const error = result.value

      switch (error.constructor) {
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
