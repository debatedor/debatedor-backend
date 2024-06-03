

import { z } from 'zod'  // usado para validar o esquema de dados da requisição antes de passar para lógica de negócios 
import { ZodValidationPipe } from '@/infra/http/controllers/pipes/zod-validation-pipe' // usado para validar o esquema de dados da requisição antes de passar para lógica de negócios 

import { CreatePostUseCase } from '@/domain/projects/application/use-cases/create-post' // lógica de negocio de criar post

const postBodySchema = z.object({
    title: z.string().email(),
    content: z.string(),
    source: z.string().url("It must be a valid link")
  })
  type  postBodySchema = z.infer< typeof postBodySchema>