import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/projects/application/repositories/users-repository'
import { User } from '@/domain/projects/enterprise/entities/user'

import { PrismaService } from '../../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<string> {
    const prismaUser = PrismaUserMapper.toPrisma(user)

    const userPrisma = await this.prisma.user.create({ data: prismaUser })

    return userPrisma.id
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
