import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseParams {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {
  deletedQuestion: Question
}

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(
    params: DeleteQuestionUseCaseParams,
  ): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(params.questionId)
    if (!question) throw new Error('Question not found')

    if (question.authorId.toString() !== params.authorId)
      throw new Error('Unauthorized')

    await this.questionsRepository.delete(question)

    return {
      deletedQuestion: question,
    }
  }
}
