export class AccountAlreadyDeactivatedError extends Error {
  constructor() {
    super('Account already deactivated')
    this.name = this.constructor.name
  }
}
