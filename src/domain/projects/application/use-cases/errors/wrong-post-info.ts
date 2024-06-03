import { UseCaseError } from '@/core/errors/use-case-error'

export class WrongPostInfoError extends Error implements UseCaseError {
  constructor() {
    super('Invalid data in your post. Go back and review')
  }
}