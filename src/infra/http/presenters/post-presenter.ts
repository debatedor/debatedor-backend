import { Post } from '@/domain/projects/enterprise/entities/post'

import { CommentPresenter } from './comment-presenter'

export class PostPresenter {
  static toHTTP(post: Post) {
    return {
      publisher: {
        name: post.publisher.name,
        lastname: post.publisher.lastname,
      },
      question: post.question,
      description: post.description,
      source: post.source,
      createdAt: post.getFormattedCreatedAt(),
      comments: post.comments?.map((comment) =>
        CommentPresenter.toHTTP(comment),
      ),
    }
  }
}
