import { Comment, User } from '@prisma/client'

export interface PrismaCommentWithRelationships extends Comment {
  User: User
}
