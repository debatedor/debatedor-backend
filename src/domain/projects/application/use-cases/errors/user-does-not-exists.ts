import { UseCaseError } from '@/core/errors/use-case-error'

export class UserDoesNotExists extends Error implements UseCaseError {
  constructor() {
    super('Esse usuário não foi cadastrado.')
  }
}
