import { expect, test } from 'vitest'
import { Slug } from './slug'

test('should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example question title')

  expect(slug.getValue()).toBe('example-question-title')
})

test('should be able to create a existing slug', () => {
  const slug = new Slug('example-question-title')

  expect(slug.getValue()).toBe('example-question-title')
})
