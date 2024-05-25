import { makeUser } from 'test/factories/make-user'

import { FakeEncrypter } from '../../cryptography/tests/fake-encypter'
import { FakeHasher } from '../../cryptography/tests/fake-hasher'
import { InMemoryUsersRepository } from '../../repositories/tests/in-memory-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.type).toBe('success')
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should return false in completedRegistration if ')
})
