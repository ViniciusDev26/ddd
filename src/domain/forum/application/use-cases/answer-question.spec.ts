import { describe, expect } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('AnswerQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a new answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      answerContent: 'forget semi-comma',
    })

    expect(answer).toBeInstanceOf(Answer)
    expect(answer.id).toBeTruthy()
    expect(answer.content).toBe('forget semi-comma')

    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
