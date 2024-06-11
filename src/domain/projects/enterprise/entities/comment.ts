import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface CommentProps {
  argument: string
  position: 'AGREES' | 'DISAGREES'
  createdAt: Date
  postId: string
  publisherId: string
}

export class Comment extends Entity<CommentProps> {
  get argument() {
    return this.props.argument
  }

  get position() {
    return this.props.position
  }

  get createdAt() {
    return this.props.createdAt
  }

  get postId() {
    return this.props.postId
  }

  get publisherId() {
    return this.props.publisherId
  }

  static create(
    props: Optional<CommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    return new Comment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
