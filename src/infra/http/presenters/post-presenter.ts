import { Post } from '@/domain/projects/enterprise/entities/post'

import { CommentPresenter } from './comment-presenter'

export class PostPresenter {
  static toHTTP(post: Post) {
    return {
      publisherId: post.publisherId,
      id: post.id.toString(),
      question: post.question,
      description: post.description,
      source: post.source,
      createdAt: post.createdAt.toString(),
      comments: post.comments?.map((comment) =>
        CommentPresenter.toHTTP(comment),
      ),
    }
  }
}
