import { type ActivateAccount } from '@/domain/usecases/commands'

export class ActivateAccountSpy implements ActivateAccount {
  public accountId: string

  public async activate(accountId: string): Promise<void> {
    this.accountId = accountId
  }
}
