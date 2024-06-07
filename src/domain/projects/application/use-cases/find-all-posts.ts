import { Injectable } from '@nestjs/common'

import { Either, success } from '@/core/types/either'

import { Post } from '../../enterprise/entities/post'
import { PostsRepository } from '../repositories/posts-repository'

type FindAllPostsUseCaseResponse = Either<unknown, Post[] | null>

@Injectable()
export class FindAllPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<FindAllPostsUseCaseResponse> {
    const posts = await this.postsRepository.findAll()

    return success(posts)
  }
}
