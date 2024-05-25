import { faker } from '@faker-js/faker'

import { Slug } from '@/domain/projects/enterprise/entities/value-objects/slug'

export function makeSkill(paramName?: string) {
  const name = paramName || faker.person.jobType()
  const slugText = Slug.createFromText(name).text

  return slugText
}
