import { Post, User } from '@prisma/client'

import { PrismaCommentWithRelationships } from './prisma-comment-model-with-relationships'

export interface PrismaPostWithRelationships extends Post {
  User: User
  comments?: PrismaCommentWithRelationships[]
}
