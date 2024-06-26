import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/projects/application/use-cases/authenticate-user'
import { CreateCommentUseCase } from '@/domain/projects/application/use-cases/create-comment'
import { CreatePostUseCase } from '@/domain/projects/application/use-cases/create-post'
import { CreateUserAccountUseCase } from '@/domain/projects/application/use-cases/create-user-account'
import { FindAllPostsUseCase } from '@/domain/projects/application/use-cases/find-all-posts'
import { OpenPostUseCase } from '@/domain/projects/application/use-cases/open-post'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { CreateUserAccountController } from './controllers/create–user-account.controller'
import { CreateCommentController } from './controllers/create-comment-controller'
import { CreatePostController } from './controllers/create-post.controller'
import { FindAllPostsController } from './controllers/find-all-posts.controller'
import { FindPostById } from './controllers/find-post-by-id'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserAccountController,
    AuthenticateUserController,
    CreatePostController,
    FindAllPostsController,
    CreateCommentController,
    FindPostById,
  ],
  providers: [
    CreateUserAccountUseCase,
    AuthenticateUserUseCase,
    CreatePostUseCase,
    FindAllPostsUseCase,
    CreateCommentUseCase,
    OpenPostUseCase,
  ],
})
export class HttpModule {}
