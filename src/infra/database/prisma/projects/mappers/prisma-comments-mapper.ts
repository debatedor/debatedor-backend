import { Comment as PrismaComment } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment as DomainComment } from '@/domain/projects/enterprise/entities/comment'

export class PrismaCommentMapper {
  static toDomain(raw: PrismaComment): DomainComment {
    return DomainComment.create(
      {
        publisherId: raw.publisherId,
        argument: raw.argument,
        position: raw.position,
        createdAt: raw.createdAt,
        postId: raw.postId,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: DomainComment): PrismaComment {
    const prismaComment: PrismaComment = {
      id: raw.id.toString(),
      argument: raw.argument,
      createdAt: raw.createdAt,
      position: raw.position,
      postId: raw.postId,
      publisherId: raw.publisherId,
    }
    return prismaComment
  }
}
