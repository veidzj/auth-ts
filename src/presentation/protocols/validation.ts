export interface Validation<T> {
  validate: (input: T) => Error | null
}
