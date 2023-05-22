import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'tests/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('DeleteQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should throw if no question is found', async () => {
    const promise = sut.execute({
      questionId: 'invalidId',
      authorId: '1',
    })

    expect(promise).rejects.toThrow('Question not found')
    expect(inMemoryQuestionsRepository.items.length).toBe(0)
  })

  it('should throw if no is author from question', async () => {
    const questionId = 'question-1'
    const authorId = 'author-1'
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID(authorId),
      },
      new UniqueEntityID(questionId),
    )
    inMemoryQuestionsRepository.create(question)

    const promise = sut.execute({
      questionId,
      authorId: 'invalidId',
    })

    expect(promise).rejects.toThrow('Unauthorized')
    expect(inMemoryQuestionsRepository.items.length).toBe(1)
  })

  it('should should delete a question', async () => {
    const questionId = 'question-1'
    const authorId = 'author-1'
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID(authorId),
      },
      new UniqueEntityID(questionId),
    )
    inMemoryQuestionsRepository.create(question)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    await sut.execute({
      questionId,
      authorId,
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
})
