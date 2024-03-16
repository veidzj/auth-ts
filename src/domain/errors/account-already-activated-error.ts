export class AccountAlreadyActivatedError extends Error {
  constructor() {
    super('Account already activated')
    this.name = this.constructor.name
  }
}
