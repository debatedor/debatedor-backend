import { Post } from '../../enterprise/entities/post'

export abstract class PostsRepository {
  abstract create(post: Post): Promise<string>
  abstract findById(id: string): Promise<Post | null>
  abstract findAll(): Promise<Post[] | null>
}
