import { type DeactivateAccount } from '@/domain/usecases/commands'

export class DeactivateAccountController {
  constructor(private readonly deactivateAccount: DeactivateAccount) {}

  public async handle(request: DeactivateAccountController.Request): Promise<void> {
    await this.deactivateAccount.deactivate(request)
  }
}

export namespace DeactivateAccountController {
  export interface Request {
    accountId: string
  }
}
