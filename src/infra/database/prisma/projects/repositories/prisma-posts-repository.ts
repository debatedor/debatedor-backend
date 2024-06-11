import { Injectable } from '@nestjs/common'

import { PostsRepository } from '@/domain/projects/application/repositories/posts-repository'
import { Post } from '@/domain/projects/enterprise/entities/post'

import { PrismaService } from '../../prisma.service'
import { PrismaPostMapper } from '../mappers/prisma-post-mapper'

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}
  async create(post: Post) {
    const prismaPost = PrismaPostMapper.toPrisma(post)
    const postPrisma = await this.prisma.post.create({ data: prismaPost })

    return postPrisma.id
  }

  async findAll(): Promise<Post[]> {
    const allPosts = await this.prisma.post.findMany()
    const allEntityPosts = allPosts.map((prismaPost) =>
      PrismaPostMapper.toDomain(prismaPost),
    )
    return allEntityPosts
  }

  async findById(id: string): Promise<Post | null> {
    const prismaPost = await this.prisma.post.findUnique({
      where: { id },
      include: { comments: true, User: true },
    })
    if (!prismaPost) return null
    const domainPost = PrismaPostMapper.toDomain(prismaPost)
    return domainPost
  }
}
