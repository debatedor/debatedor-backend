import { Comment, Post, User } from '@prisma/client'

export interface PrismaPostWithRelationships extends Post {
  User: User
  comments?: Comment[]
}
