import { Either, success } from '@/core/types/either'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { Post } from '../../enterprise/entities/post'
import { PostsRepository } from '../repositories/posts-repository'
import { PostDoesNotExist } from './errors/post-does-not-exist'
import { Injectable } from '@nestjs/common'

interface OpenPostUseCaseRequest {
  postId: string
}

type OpenPostUseCaseResponse = Either<PostDoesNotExist, Post | null>

@Injectable()
export class OpenPostUseCase {
  constructor(
    private prismaService: PrismaService,
    private postsRepository: PostsRepository,
  ) {}

  async execute({
    postId,
  }: OpenPostUseCaseRequest): Promise<OpenPostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)
    return success(post)
  }
}
