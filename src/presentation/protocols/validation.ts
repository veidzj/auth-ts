export interface Validation<T> {
  validate: (input: T, options?: object) => string[]
}
