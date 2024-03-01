export class AccessDeniedError extends Error {
  constructor() {
    super('Access denied')
    this.name = 'Authorization'
    Error.captureStackTrace(this, this.constructor)
  }
}
