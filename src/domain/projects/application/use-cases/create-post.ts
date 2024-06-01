import { Injectable } from '@nestjs/common';
import { Either, failure, success } from '@/core/types/either';
import { PostsRepository } from '../repositories/posts-repository' // Precisa importar o repositorio 
import { WrongPostInfoError } from './errors/wrong-post-info'// importado os erros

interface CreatePostUseCaseRequest{
    title: string // titulo da notica TEM QUE ser uma string
    content: string // conteudo TEM QUE ser uma string
    source: string

}

type CreatePostUseCaseResponse = Either<
 WrongPostInfoError, // criar função em src/domain/aplication/erros
 {

    postId: string; // retorno de uma respota bem sucedida com  os dados do post
    title: string;
    content: string;
    source: string;
 }


>

@Injectable()
export class CreatePostUseCase{

constructor (private PostsRepository = PostsRepository){}

async  execute ({
title, 
content,
source, // o objeto recebido deve ter essas propriedades
}: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse>{

    //  Verifica se os dados do post são válidos
    if(!title || !content || !source ){
        return failure(new WrongPostInfoError);
    }


    try{
       // Criar e salvar o post no banco de dados
       const postId = await this.PostsRepository.create({
        title,
        content,
        source,
       });
    

     // Construa a resposta bem-sucedida com os dados do post criado
     const response: CreatePostUseCaseResponse = success({
        postId,
        title,
        content,
        source,
      });
            
     return response;




 } catch (error){
        return failure (new WrongPostInfoError);
        }
      }
    }

















