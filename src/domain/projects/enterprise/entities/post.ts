import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PostProps{ // descreve quais são as propriedades de um post 
title: String
content: String
source: String
publicationDate: Date
}

export class Post extends Entity<PostProps>{

    get title() {
        return this.props.title
      }

      get content(){
        return this.props.content
      }

      get source(){
        return this.props.source
      }

      get publicationDate(){
        return this.props.publicationDate
      }

// com o metodo create a baixo, você consegue criar instancias post em diferentes partes do codigo
      static create(props: PostProps, id?: UniqueEntityId) { // metodo estático, pode ser chamado diretamente na classe Post
        const post  = new Post(
          {
            ...props,
          },
          id,
        )
    
        return post
      }



}

