import { Controller, Get, HttpCode, Query } from '@nestjs/common'

import { OpenPostUseCase } from '@/domain/projects/application/use-cases/open-post'
import { Public } from '@/infra/auth/public'

import { PostPresenter } from '../presenters/post-presenter'

@Controller()
@Public()
export class FindPostById {
  constructor(private openPostUseCase: OpenPostUseCase) {}
  @Get('find-post-by-id')
  @HttpCode(200)
  async handle(@Query() postIdObject) {
    const postIdDecoded = decodeURI(postIdObject.id)

    console.log(postIdDecoded)
    const result = await this.openPostUseCase.execute({ postId: postIdDecoded })
    if (result.value === null) return null
    if (result.type === 'success') {
      return PostPresenter.toHTTP(result.value)
    }
  }
}
