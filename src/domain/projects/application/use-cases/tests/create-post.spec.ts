import { InMemoryPostsRepository } from '../../repositories/tests/in-memory-post-repository'
import { CreatePostUseCase } from '../create-post'

let createPostUseCase: CreatePostUseCase
let inMemoryPostsRepository: InMemoryPostsRepository

describe('Create post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    createPostUseCase = new CreatePostUseCase(inMemoryPostsRepository)
  })

  it('should be able to create an post', async () => {
    const result = await createPostUseCase.execute({
      publisherId: 'id teste',
      content: 'conteude teste',
      source: 'source test',
      title: 'title test',
    })

    expect(result.type).toBe('success')
  })
})
