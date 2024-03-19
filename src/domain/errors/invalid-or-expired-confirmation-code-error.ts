export class InvalidOrExpiredConfirmationCodeError extends Error {
  constructor() {
    super('Confirmation code invalid or expired')
    this.name = this.constructor.name
  }
}
