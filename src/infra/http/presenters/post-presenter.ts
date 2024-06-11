import { Post } from '@/domain/projects/enterprise/entities/post'

import { CommentPresenter } from './comment-presenter'

export class PostPresenter {
  static toHTTP(post: Post) {
    return {
      publisherId: post.publisherId,
      id: post.id.toString(),
      title: post.title,
      content: post.content,
      source: post.source,
      comments: post.comments?.map((comment) =>
        CommentPresenter.toHTTP(comment),
      ),
    }
  }
}
