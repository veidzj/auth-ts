export class AccountAlreadyExists extends Error {
  constructor() {
    super('Account already exists')
    this.name = 'Authentication'
    Error.captureStackTrace(this, this.constructor)
  }
}
