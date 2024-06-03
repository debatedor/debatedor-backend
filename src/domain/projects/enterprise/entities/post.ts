import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PostProps {
  // descreve quais são as propriedades de um post
  publisherId: string
  title: string
  content: string
  source: string
}

export class Post extends Entity<PostProps> {
  get publisherId() {
    return this.props.publisherId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get source() {
    return this.props.source
  }

  // com o metodo create a baixo, você consegue criar instancias post em diferentes partes do codigo
  static create(props: PostProps, id?: UniqueEntityId) {
    // metodo estático, pode ser chamado diretamente na classe Post
    const post = new Post(
      {
        ...props,
      },
      id,
    )

    return post
  }
}
