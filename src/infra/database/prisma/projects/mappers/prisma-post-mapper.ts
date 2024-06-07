import { Post as PrismaPost } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Post as DomainPost } from '@/domain/projects/enterprise/entities/post'

export class PrismaPostMapper {
  static toDomain(raw: PrismaPost): DomainPost {
    return DomainPost.create(
      {
        title: raw.title,
        content: raw.content,
        source: raw.source,
        publisherId: raw.publisherId,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: DomainPost): PrismaPost {
    return {
      id: raw.id.toString(),
      content: raw.content,
      title: raw.title,
      source: raw.source,
      publisherId: raw.publisherId,
    }
  }
}
