import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Properties> {
  private _id: UniqueEntityID
  protected props: Properties

  protected constructor(props: Properties, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  get id() {
    return this._id
  }
}
