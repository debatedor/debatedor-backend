import { UseCaseError } from '@/core/errors/use-case-error'

export class PostDoesNotExist extends Error implements UseCaseError {
  constructor() {
    super('Esse post não foi publicado.')
  }
}
