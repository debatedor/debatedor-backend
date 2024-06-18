import { Comment, Post, User } from '@prisma/client'

export interface PrismaPostWithRelationships extends Post {
  user: User
  comments: Comment[]
}
