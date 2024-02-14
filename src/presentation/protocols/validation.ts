export interface Validation<T> {
  validate: (input: T) => string[]
}
