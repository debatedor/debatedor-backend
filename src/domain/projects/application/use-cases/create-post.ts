import { Injectable } from '@nestjs/common';
import { Either, failure, success } from '@/core/types/either';
// Precisa importar o repositorio 
// Precisa importar os erros

interface CreatePostUseCaseRequest{
    title: String // titulo da notica TEM QUE ser uma string
    content: String // conteudo TEM QUE ser uma string
    source: String

}

interface CreatePostUseCaseResponse = Either<
 WrongPostInfoError, // criar função em src/domain/aplication/erros
 {
    // post sera criado e publicado. Essa função provavelmente vai estar no controller
 }


>

@Injectable()
export class CreatePostUseCase{

constructor(
   // private postsRepository: postsRepository,
){}
async  execute ({
title, 
content,
source, // o objeto recebido deve ter essas propriedades
}: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse>{



    // Aqui ficara a logica da  resposta para a requisição


}
}


















}