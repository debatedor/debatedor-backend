import { User } from '@/domain/projects/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
