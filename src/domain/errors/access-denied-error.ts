export class AccessDeniedError extends Error {
  constructor() {
    super('Access denied')
    this.name = 'Forbidden'
    Error.captureStackTrace(this, this.constructor)
  }
}
