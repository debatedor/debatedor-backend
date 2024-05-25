import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Degree,
  DegreeProps,
} from '@/domain/projects/enterprise/entities/degree'

export function makeDegree(
  userId: UniqueEntityId,
  override?: Partial<DegreeProps>,
  id?: UniqueEntityId,
) {
  console.log(userId)
  const degree = Degree.create(
    {
      name: faker.person.jobArea(),
      type: 'BACHELORS',
      status: 'COMPLETED',
      institutionName: faker.company.name(),
      description: faker.lorem.paragraph(),
      userId: userId.toString(),
      ...override,
    },
    id,
  )

  return degree
}
