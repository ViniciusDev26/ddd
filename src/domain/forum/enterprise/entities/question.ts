import { Slug } from './value-objects/slug'
import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import dayjs from 'dayjs'

export interface QuestionProps {
  title: string
  slug: Slug
  content: string
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return question
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, 'days') <= 3
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }
}
