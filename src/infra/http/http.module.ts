import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/projects/application/use-cases/authenticate-user'
import { CreatePostUseCase } from '@/domain/projects/application/use-cases/create-post'
import { CreateUserAccountUseCase } from '@/domain/projects/application/use-cases/create-user-account'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { CreateUserAccountController } from './controllers/create–user-account.controller'
import { CreatePostController } from './controllers/create-post.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserAccountController,
    AuthenticateUserController,
    CreatePostController,
  ],
  providers: [
    CreateUserAccountUseCase,
    AuthenticateUserUseCase,
    CreatePostUseCase,
  ],
})
export class HttpModule {}
