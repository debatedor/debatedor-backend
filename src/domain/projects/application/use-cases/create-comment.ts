import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/types/either'

import { Comment } from '../../enterprise/entities/comment'
import { CommentsRepository } from '../repositories/comments-repository'
import { PostsRepository } from '../repositories/posts-repository'
import { PostDoesNotExist } from './errors/post-does-not-exist'

interface CreateCommentUseCaseRequest {
  argument: string
  position: 'AGREES' | 'DISAGREES'
  postId: string
  publisherId: string
}

type CreateCommentUseCaseResponse = Either<PostDoesNotExist, undefined>

@Injectable()
export class CreateCommentUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  async execute({
    argument,
    position,
    postId,
    publisherId,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const createdPost = await this.postsRepository.findById(postId)
    


    if (!createdPost) {
      return failure(new PostDoesNotExist())
    }

    const publisher = createdPost?.publisher

    const comment = Comment.create({
      argument,
      position,
      postId,
      publisher,
    })

    this.commentsRepository.create(comment)

    return success(undefined)
  }
}
