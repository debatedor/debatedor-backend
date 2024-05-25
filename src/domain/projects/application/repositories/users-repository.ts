import { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
  abstract create(user: User): Promise<string>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findById(id: string): Promise<User | null>
}
