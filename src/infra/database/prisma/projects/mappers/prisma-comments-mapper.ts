import { Comment, Comment as PrismaComment, User } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment as DomainComment } from '@/domain/projects/enterprise/entities/comment'
import { PrismaUserMapper } from './prisma-user-mapper'
import { PrismaCommentWithRelationships } from './PrismaModelsWithRelationships/prisma-comment-model-with-relationships'

export class PrismaCommentMapper {
  static toDomain(raw: PrismaCommentWithRelationships): DomainComment {
    return DomainComment.create(
      {
        publisher: PrismaUserMapper.toRequiredDomain(raw.User),
        argument: raw.argument,
        position: raw.position,
        createdAt: raw.createdAt,
        postId: raw.postId,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toDomainReceivingUser(raw: Comment, publisher: User): DomainComment {
    return DomainComment.create(
      {
        publisher: PrismaUserMapper.toRequiredDomain(publisher),
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
      publisherId: raw.publisher.id.toString(),
    }
    return prismaComment
  }
}
