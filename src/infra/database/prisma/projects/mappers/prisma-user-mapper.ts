import { User as PrismaUser } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User as DomainUser } from '@/domain/projects/enterprise/entities/user'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): DomainUser {
    return DomainUser.create(
      {
        name: raw.name,
        lastname: raw.lastname,
        birthday: raw.birthday ?? undefined,
        sex: raw.sex ?? undefined,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: DomainUser): PrismaUser {
    return {
      id: raw.id.toString(),
      email: raw.email,
      name: raw.name,
      lastname: raw.lastname,
      sex: raw.sex ?? null,
      birthday: raw.birthday ?? null,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? null,
    }
  }
}
