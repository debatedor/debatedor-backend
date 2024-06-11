import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { AuthenticateUserUseCase } from '@/domain/projects/application/use-cases/authenticate-user'
import { WrongCredentialsError } from '@/domain/projects/application/use-cases/errors/wrong-credentials'
import { Public } from '@/infra/auth/public'

import { ZodValidationPipe } from './pipes/zod-validation-pipe'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres.'),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateUserController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}
  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUser.execute({
      email,
      password,
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
          throw new UnauthorizedException({
            errors: [
              {
                field: null,
                message: error.message,
              },
            ],
          })
      }
    }

    const { accessToken } = result.value

    return {
      success: true,
      access_token: accessToken,
    }
  }
}
