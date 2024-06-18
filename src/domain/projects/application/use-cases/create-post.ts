import { Injectable } from '@nestjs/common'

import { Either, success } from '@/core/types/either'

import { Post } from '../../enterprise/entities/post'
import { PostsRepository } from '../repositories/posts-repository' // Precisa importar o repositorio
import { WrongPostInfoError } from './errors/wrong-post-info' // importado os erros

interface CreatePostUseCaseRequest {
  publisherId: string
  question: string // titulo da notica TEM QUE ser uma string
  description: string // conteudo TEM QUE ser uma string
  source: string
}

type CreatePostUseCaseResponse = Either<
  WrongPostInfoError, // criar função em src/domain/aplication/erros
  {
    postId: string // retorno de uma respota bem sucedida com  os dados do post
  }
>

@Injectable()
export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    publisherId,
    question,
    description,
    source, // o objeto recebido deve ter essas propriedades
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    //  Verifica se os dados do post são válidos
    // if (!question || !description || !source) {
    //   return failure(new WrongPostInfoError())
    // }

    // Criar e salvar o post no banco de dados
    const postEntity = Post.create({
      publisherId,
      question,
      description,
      source,
    })

    const postId = await this.postsRepository.create(postEntity)

    // Construa a resposta bem-sucedida com os dados do post criado
    return success({
      postId,
    })
  }
}
