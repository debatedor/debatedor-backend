import { Comment } from '@/domain/projects/enterprise/entities/comment'

export class CommentPresenter {
  static toHTTP(comment: Comment) {
    return {
      publisherId: comment.publisherId,
      id: comment.id.toString(),
      argument: comment.argument,
      createdAt: comment.createdAt,
      position: comment.position,
      postId: comment.postId,
    }
  }
}
