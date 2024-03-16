export class InternalServerError extends Error {
  constructor(stack: string) {
    super('The server has encountered an unexpected error. Please try again later')
    this.name = this.constructor.name
    this.stack = stack
  }
}
