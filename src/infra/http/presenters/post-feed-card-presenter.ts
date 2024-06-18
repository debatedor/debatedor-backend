import { Post } from '@/domain/projects/enterprise/entities/post'

export class PostPresenter {
  static toHTTP(post: Post) {
    return {
      publisherId: post.publisherId,
      id: post.id.toString(),
      question: post.question,
      description: post.description,
      source: post.source,
      date: post.createdAt.toString(),
    }
  }
}
