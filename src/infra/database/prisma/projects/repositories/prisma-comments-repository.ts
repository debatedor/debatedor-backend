import { Injectable } from '@nestjs/common'

import { CommentsRepository } from '@/domain/projects/application/repositories/comments-repository'
import { Comment } from '@/domain/projects/enterprise/entities/comment'

import { PrismaService } from '../../prisma.service'
import { PrismaCommentMapper } from '../mappers/prisma-comments-mapper'

@Injectable()
export class PrismaCommentsRepository implements CommentsRepository {
  constructor(private prismaService: PrismaService) {}
  async create(comment: Comment): Promise<undefined> {
    const prismaComment = PrismaCommentMapper.toPrisma(comment)
    await this.prismaService.comment.create({
      data: prismaComment,
    })
    return undefined
  }
}
