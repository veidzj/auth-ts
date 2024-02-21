export class InternalServerError extends Error {
  constructor() {
    super('Internal server error')
    this.name = 'Server'
    Error.captureStackTrace(this, this.constructor)
  }
}
