import { Slug } from '../slug'

it('should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example- question& title-')

  expect(slug.text).toEqual('example-question-title')
})
