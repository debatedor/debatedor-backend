import { Module } from '@nestjs/common'

import { CommentsRepository } from '@/domain/projects/application/repositories/comments-repository'
import { PostsRepository } from '@/domain/projects/application/repositories/posts-repository'
import { UsersRepository } from '@/domain/projects/application/repositories/users-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaCommentsRepository } from './prisma/projects/repositories/prisma-comments-repository'
import { PrismaPostsRepository } from './prisma/projects/repositories/prisma-posts-repository'
import { PrismaUsersRepository } from './prisma/projects/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository,
    },
    {
      provide: CommentsRepository,
      useClass: PrismaCommentsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    PostsRepository,
    CommentsRepository,
  ],
})
export class DatabaseModule {}
