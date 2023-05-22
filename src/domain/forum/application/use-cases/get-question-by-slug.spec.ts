import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'tests/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('GetQuestionBySlugUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should throw error if don`t found find a question by slug', async () => {
    const promise = sut.execute({
      slug: 'slug-example',
    })

    expect(promise).rejects.toThrowError('Question not found')
  })

  it('should can find a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('slug-example'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'slug-example',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toBe(newQuestion.title)
  })
})
