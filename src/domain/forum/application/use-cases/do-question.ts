import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-repository'

interface DoQuestionUseCaseParams {
  authorId: string
  title: string
  content: string
}

interface DoQuestionUseCaseResponse {
  question: Question
}

export class DoQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: DoQuestionUseCaseParams): Promise<DoQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)

    return { question }
  }
}
