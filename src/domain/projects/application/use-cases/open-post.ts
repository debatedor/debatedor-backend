import { Injectable } from '@nestjs/common'

import { Either, success } from '@/core/types/either'

import { Post } from '../../enterprise/entities/post'
import { PostsRepository } from '../repositories/posts-repository'
import { PostDoesNotExist } from './errors/post-does-not-exist'

interface OpenPostUseCaseRequest {
  postId: string
}

type OpenPostUseCaseResponse = Either<PostDoesNotExist, Post | null>

@Injectable()
export class OpenPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    postId,
  }: OpenPostUseCaseRequest): Promise<OpenPostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)
    return success(post)
  }
}
