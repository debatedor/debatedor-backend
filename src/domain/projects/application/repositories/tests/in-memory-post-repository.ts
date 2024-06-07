import { Post } from '@/domain/projects/enterprise/entities/post'

import { PostsRepository } from '../posts-repository'

export class InMemoryPostsRepository implements PostsRepository {
  public posts: Post[] = []
  async create(post: Post) {
    this.posts.push(post)
    return post.id.toString()
  }

  async findAll(): Promise<Post[]> {
    return this.posts
  }
}
