import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseParams {
  instructorId: string
  questionId: string
  answerContent: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    answerContent,
  }: AnswerQuestionUseCaseParams): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
      content: answerContent,
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
