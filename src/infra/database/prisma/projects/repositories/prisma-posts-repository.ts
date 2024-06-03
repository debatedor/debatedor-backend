import { Injectable } from '@nestjs/common'

import { PostsRepository } from '@/domain/projects/application/repositories/posts-repository'
import { Post } from '@/domain/projects/enterprise/entities/post'

import { PrismaService } from '../../prisma.service'

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaService) {}
  async create(post: Post) {
    const postPrisma = await this.prisma.post.create({
      data: {
        content: post.content,
        source: post.source,
        title: post.title,
        userId: post.publisherId,
      },
    })
    return postPrisma.id
  }
}
