import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-repository'

interface GetQuestionBySlugUseCaseParams {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(
    params: GetQuestionBySlugUseCaseParams,
  ): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(params.slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return {
      question,
    }
  }
}
