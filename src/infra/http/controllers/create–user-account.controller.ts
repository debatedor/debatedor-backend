import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { CreateUserAccountUseCase } from '@/domain/projects/application/use-cases/create-user-account'
import { EmailAlreadyExists } from '@/domain/projects/application/use-cases/errors/email-already-exists'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/controllers/pipes/zod-validation-pipe'

const bodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'O nome precisa ter no mínimo 1 caracter.')
    .max(80, 'O nome precisa ter no máximo 80 caracteres.')
    .toLowerCase()
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome só aceita letras.')
    .transform((str) => str.replace(/\s+/g, ' ')),
  email: z
    .string()
    .trim()
    .min(1, 'O E-mail precisa ter no mínimo 1 caracter.')
    .email('E-mail inválido.')
    .max(150, 'E-mail precisa ter no máximo 150 caracteres.')
    .toLowerCase(),
  password: z
    .string()
    .min(8, 'A senha precisa ter no mínimo 8 caracteres.')
    .max(30, 'A senha precisa ter no máximo 30 caracteres.')
    .regex(
      /[A-Za-z\d@$!%*?&]/,
      'A senha possuí caracteres não permitidos. (A-Z @$!%*?&) são permitidos.',
    ),
})

const bodyValidationPipe = new ZodValidationPipe(bodySchema)

type BodySchema = z.infer<typeof bodySchema>

@Controller('/users')
@Public()
export class CreateUserAccountController {
  constructor(private useCase: CreateUserAccountUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: BodySchema) {
    const { name, email, password } = body

    const result = await this.useCase.execute({ name, email, password })

    if (result.type === 'failure') {
      const error = result.value

      switch (error.constructor) {
        case EmailAlreadyExists:
          throw new ConflictException({
            errors: [
              {
                field: 'email',
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

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
