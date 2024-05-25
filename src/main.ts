import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn'],
  })
  app.enableCors({
    credentials: true,
    allowedHeaders: ['content-type', 'Authorization'],
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  })
  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  await app
    .listen(port)
    .then(() => console.log(`Server running on port ${port} 🚀`))
}
bootstrap()
