import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/types/either'

import { User } from '../../enterprise/entities/user'
import { Encrypter } from '../cryptography/encrypter'
import { HashGenerator } from '../cryptography/hash-generator'
import { UsersRepository } from '../repositories/users-repository'
import { EmailAlreadyExists } from './errors/email-already-exists'

interface CreateUserAccountUseCaseRequest {
  name: string
  email: string
  password: string
  lastname: string
  sex?: 'MASCULINO' | 'FEMININO'
  birthday?: string
}

type CreateUserAccountUseCaseResponse = Either<
  EmailAlreadyExists,
  {
    accessToken: string
  }
>

@Injectable()
export class CreateUserAccountUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
    private encrypter: Encrypter,
  ) {}

  async execute({
    name,
    email,
    password,
    lastname,
    sex,
    birthday,
  }: CreateUserAccountUseCaseRequest): Promise<CreateUserAccountUseCaseResponse> {
    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (userWithEmail) {
      return failure(new EmailAlreadyExists())
    }

    const user = User.create({
      name,
      email,
      password: await this.hashGenerator.hash(password),
      lastname,
      sex,
      birthday,
    })

    const userId = await this.usersRepository.create(user)
    const accessToken = await this.encrypter.encrypt({
      sub: userId,
    })

    return success({ accessToken })
  }
}
