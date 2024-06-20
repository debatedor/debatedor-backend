import { Post as PrismaPost } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Post as DomainPost } from '@/domain/projects/enterprise/entities/post'

import { PrismaCommentMapper } from './prisma-comments-mapper'
import { PrismaUserMapper } from './prisma-user-mapper'
import { PrismaPostWithRelationships } from './PrismaModelsWithRelationships/prisma-post-model-with-relationships'

export class PrismaPostMapper {
  static toDomain(raw: PrismaPostWithRelationships): DomainPost {
    return DomainPost.create(
      {
        question: raw.question,
        description: raw.description,
        source: raw.source,
        createdAt: raw.createdAt,
        publisher: PrismaUserMapper.toDomain(raw.User),
        comments:
          raw.comments === undefined
            ? undefined
            : raw.comments.map((comment) =>
                PrismaCommentMapper.toDomain(comment),
              ),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: DomainPost): PrismaPost {
    return {
      id: raw.id.toString(),
      description: raw.description,
      question: raw.question,
      source: raw.source,
      createdAt: raw.createdAt,
      publisherId: raw.publisher.id.toString(),
    }
  }
}
