import { Controller, Get, HttpCode, Param } from '@nestjs/common'

import { OpenPostUseCase } from '@/domain/projects/application/use-cases/open-post'
import { Public } from '@/infra/auth/public'

import { PostPresenter } from '../presenters/post-presenter'

@Controller('posts/:id')
@Public()
export class FindAllPostsController {
  constructor(private openPostUseCase: OpenPostUseCase) {}
  @Get()
  @HttpCode(200)
  async handle(@Param('id') id) {
    const result = await this.openPostUseCase.execute(id)
    if (result.value === null) return null
    if (result.type === 'success') {
      return PostPresenter.toHTTP(result.value)
    }
  }
}
