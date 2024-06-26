import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  name: string
  lastname: string
  birthday: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get lastname() {
    return this.props.lastname
  }

  get birthday() {
    return this.props.birthday
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
