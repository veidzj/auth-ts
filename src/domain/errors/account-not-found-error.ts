export class AccountNotFoundError extends Error {
  constructor() {
    super('Account not found')
    this.name = this.constructor.name
  }
}
