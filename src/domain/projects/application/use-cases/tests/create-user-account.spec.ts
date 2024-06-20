import { faker } from '@faker-js/faker'
import { makeUser } from 'test/factories/make-user'

import { FakeEncrypter } from '../../cryptography/tests/fake-encypter'
import { FakeHasher } from '../../cryptography/tests/fake-hasher'
import { InMemoryUsersRepository } from '../../repositories/tests/in-memory-users-repository'
import { CreateUserAccountUseCase } from '../create-user-account'
import { EmailAlreadyExists } from '../errors/email-already-exists'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHashGenerator: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: CreateUserAccountUseCase

describe('Create user account', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHashGenerator = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new CreateUserAccountUseCase(
      inMemoryUsersRepository,
      fakeHashGenerator,
      fakeEncrypter,
    )
  })

  it('should be able to create an user account', async () => {
    const result = await sut.execute({
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      birthday: '',
      password: faker.internet.password(),
    })

    expect(result.type).toBe('success')
    // if (result.type === 'success') {
    //   expect(inMemoryUsersRepository.items[0]).toEqual(result.value.user)
    // }
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      password: '12345678',
    })

    const hashedPassword = await fakeHashGenerator.hash('12345678')

    expect(result.type).toBe('success')

    if (result.type === 'success') {
      expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
    }
  })

  it('should not be able to create an user with an email in use', async () => {
    const user = makeUser({ email: 'john.doe@mail.com' })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    expect(result.type).toBe('failure')
    expect(result.value).toBeInstanceOf(EmailAlreadyExists)
  })
})
