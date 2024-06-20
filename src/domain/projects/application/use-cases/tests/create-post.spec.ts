import { InMemoryPostsRepository } from '../../repositories/tests/in-memory-post-repository'
import { InMemoryUsersRepository } from '../../repositories/tests/in-memory-users-repository'
import { CreatePostUseCase } from '../create-post'

let createPostUseCase: CreatePostUseCase
let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryUsersRepository: InMemoryUsersRepository

describe('Create post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createPostUseCase = new CreatePostUseCase(
      inMemoryUsersRepository,
      inMemoryPostsRepository,
    )
  })

  it('should be able to create an post', async () => {
    const result = await createPostUseCase.execute({
      publisherId: 'id teste',
      description: 'conteude teste',
      source: 'source test',
      question: 'title test',
    })

    expect(result.type).toBe('success')
  })
})
