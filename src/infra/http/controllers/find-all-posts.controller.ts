import { Controller, Get, HttpCode } from '@nestjs/common'

import { FindAllPostsUseCase } from '@/domain/projects/application/use-cases/find-all-posts'
import { Public } from '@/infra/auth/public'

import { PostPresenter } from '../presenters/post-presenter'

@Controller('posts')
@Public()
export class FindAllPostsController {
  constructor(private findAllPostsUseCase: FindAllPostsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const result = await this.findAllPostsUseCase.execute()
    if (result.type === 'success') {
      const HTTPPosts = result.value?.map((post) => PostPresenter.toHTTP(post))
      return HTTPPosts
    }
  }
}
