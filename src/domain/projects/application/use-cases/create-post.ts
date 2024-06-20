import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/types/either'

import { Post } from '../../enterprise/entities/post'
import { PostsRepository } from '../repositories/posts-repository' // Precisa importar o repositorio
import { UsersRepository } from '../repositories/users-repository'
import { UserDoesNotExists } from './errors/user-does-not-exists'

interface CreatePostUseCaseRequest {
  publisherId: string
  question: string // titulo da notica TEM QUE ser uma string
  description: string // conteudo TEM QUE ser uma string
  source: string
}

type CreatePostUseCaseResponse = Either<
  UserDoesNotExists, // criar função em src/domain/aplication/erros
  {
    postId: string // retorno de uma respota bem sucedida com  os dados do post
  }
>

@Injectable()
export class CreatePostUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({
    publisherId,
    question,
    description,
    source,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const publisher = await this.usersRepository.findById(publisherId)

    if (!publisher) {
      return failure(new UserDoesNotExists())
    }

    const postEntity = Post.create({
      publisher,
      question,
      description,
      source,
    })

    const postId = await this.postsRepository.create(postEntity)

    return success({
      postId,
    })
  }
}
