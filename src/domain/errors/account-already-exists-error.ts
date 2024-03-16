export class AccountAlreadyExistsError extends Error {
  constructor() {
    super('Account already exists')
    this.name = this.constructor.name
  }
}
