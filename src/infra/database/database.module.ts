import { Module } from '@nestjs/common'

import { PostsRepository } from '@/domain/projects/application/repositories/posts-repository'
import { UsersRepository } from '@/domain/projects/application/repositories/users-repository'

import { PrismaService } from './prisma/prisma.service'
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
  ],
  exports: [PrismaService, UsersRepository, PostsRepository],
})
export class DatabaseModule {}
