import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Comment } from './comment'
import { User } from './user'

export interface PostProps {
  // descreve quais são as propriedades de um post
  publisher: User
  question: string
  description: string
  source: string
  createdAt: Date
  comments?: Comment[]
}

export class Post extends Entity<PostProps> {
  get publisher() {
    return this.props.publisher
  }

  get question() {
    return this.props.question
  }

  get description() {
    return this.props.description
  }

  get source() {
    return this.props.source
  }

  get comments() {
    return this.props.comments
  }

  get createdAt() {
    return this.props.createdAt
  }

  getFormattedCreatedAt() {
    return (
      this.props.createdAt.toLocaleDateString() +
      '  ' +
      this.props.createdAt.getHours() +
      ':' +
      this.props.createdAt.getMinutes()
    )
  }

  // com o metodo create a baixo, você consegue criar instancias post em diferentes partes do codigo
  static create(props: Optional<PostProps, 'createdAt'>, id?: UniqueEntityId) {
    // metodo estático, pode ser chamado diretamente na classe Post
    const post = new Post(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return post
  }
}
