import { UseCaseError } from '@/core/errors/use-case-error'

export class WrongPostInfoError extends Error implements UseCaseError {
  constructor() {
    super('Dados não válidos no seu post. Volte e revise')
  }
}