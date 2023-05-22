import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(id: string): Promise<Question | null> {
    const question =
      this.items.find((item) => item.id.toString() === id) ?? null

    return question ?? null
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.getValue() === slug)

    return question ?? null
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async delete(question: Question): Promise<void> {
    this.items = this.items.filter((item) => item.id !== question.id)
  }
}
