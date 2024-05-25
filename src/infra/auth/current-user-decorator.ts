import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserJwtPayload } from './jwt.strategy'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user

    return user as UserJwtPayload
  },
)
