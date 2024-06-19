import { Post } from '@/domain/projects/enterprise/entities/post'

export class PostFeedCardPresenter {
  static toHTTP(post: Post) {
    return {
      publisher: {
        name: post.publisher.name
      },
      id: post.id.toString(),
      question: post.question,
      description: post.description,
      source: post.source,
      date: post.createdAt.toString(),
    }
  }
}
