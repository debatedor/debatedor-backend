import { User } from '@/domain/projects/enterprise/entities/user'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(user: User): Promise<string> {
    this.items.push(user)
    return user.id.toString()
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async save(user: User): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === user.id.toString(),
    )

    if (index !== -1) {
      this.items[index] = user
    }
  }
}
