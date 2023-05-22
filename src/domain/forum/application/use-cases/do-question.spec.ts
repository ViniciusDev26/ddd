import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { Question } from '../../enterprise/entities/question'
import { DoQuestionUseCase } from './do-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DoQuestionUseCase

describe('DoQuestion', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DoQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to do a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'any title',
      content: 'any content',
    })

    expect(question).toBeInstanceOf(Question)
    expect(question.id).toBeTruthy()
    expect(question.title).toBe('any title')
    expect(question.isNew).toBe(true)
  })
})
