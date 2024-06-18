import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Comment } from './comment'

export interface PostProps {
  // descreve quais são as propriedades de um post
  publisherId: string
  question: string
  description: string
  source: string
  createdAt: Date
  comments?: Comment[]
}

export class Post extends Entity<PostProps> {
  get publisherId() {
    return this.props.publisherId
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

  static create(props: Optional<PostProps, 'createdAt'>, id?: UniqueEntityId) {
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
