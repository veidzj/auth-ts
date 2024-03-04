export class InternalServerError extends Error {
  constructor() {
    super('The server has encountered an unexpected error. Please try again later')
    this.name = 'Internal Server Error'
    Error.captureStackTrace(this, this.constructor)
  }
}
