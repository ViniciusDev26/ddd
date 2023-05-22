export class Slug {
  private value: string
  private constructor(value: string) {
    this.value = value
  }

  getValue() {
    return this.value
  }

  static create(slug: string) {
    const newSlug = new Slug(slug)

    return newSlug
  }

  /**
   * Receives a string and normalize it as a slug
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '-')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
