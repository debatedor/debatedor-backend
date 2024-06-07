import { Post } from '@/domain/projects/enterprise/entities/post'

export class PostPresenter {
  static toHTTP(post: Post) {
    return {
      publisherId: post.publisherId,
      id: post.id.toString(),
      title: post.title,
      content: post.content,
      source: post.source,
    }
  }
}
