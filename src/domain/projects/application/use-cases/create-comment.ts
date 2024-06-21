import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/types/either'

import { Comment } from '../../enterprise/entities/comment'
import { CommentsRepository } from '../repositories/comments-repository'
import { PostsRepository } from '../repositories/posts-repository'
import { UsersRepository } from '../repositories/users-repository'
import { PostDoesNotExist } from './errors/post-does-not-exist'
import { UserDoesNotExists } from './errors/user-does-not-exists'

interface CreateCommentUseCaseRequest {
  argument: string
  // position: 'AGREES' | 'DISAGREES'
  postId: string
  publisherId: string
}

type CreateCommentUseCaseResponse = Either<PostDoesNotExist, undefined>

@Injectable()
export class CreateCommentUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    argument,
    // position,
    postId,
    publisherId,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const publisher = await this.usersRepository.findById(publisherId)

    if (!publisher) {
      return failure(new UserDoesNotExists())
    }

    const createdPost = await this.postsRepository.findById(postId)

    if (!createdPost) {
      return failure(new PostDoesNotExist())
    }

    const comment = Comment.create({
      argument,
      // position,
      postId,
      publisher,
    })

    this.commentsRepository.create(comment)

    return success(undefined)
  }
}
