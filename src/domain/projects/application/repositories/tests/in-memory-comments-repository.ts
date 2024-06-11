import { Comment } from '@/domain/projects/enterprise/entities/comment'

import { CommentsRepository } from '../comments-repository'

export class InMemoryCommentsRepository implements CommentsRepository {
  private comments: Comment[] = []
  async create(comment: Comment): Promise<undefined> {
    this.comments.push(comment)
    return undefined
  }
}
