import { Comment } from '@/domain/projects/enterprise/entities/comment'

export class CommentPresenter {
  static toHTTP(comment: Comment) {
    return {
      publisher: {
        name: comment.publisher.name,
        lastname: comment.publisher.lastname,
      },
      argument: comment.argument,
      createdAt: comment.createdAt,
      // position: comment.position,
      postId: comment.postId,
    }
  }
}
