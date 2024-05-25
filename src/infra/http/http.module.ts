import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/projects/application/use-cases/authenticate-user'
import { CreateUserAccountUseCase } from '@/domain/projects/application/use-cases/create-user-account'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateUserController } from './controllers/authenticate-user.controller'
import { CreateUserAccountController } from './controllers/create–user-account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserAccountController, AuthenticateUserController],
  providers: [CreateUserAccountUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
