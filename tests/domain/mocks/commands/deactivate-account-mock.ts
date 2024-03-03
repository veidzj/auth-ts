import { type DeactivateAccount } from '@/domain/usecases/commands'

export class DeactivateAccountSpy implements DeactivateAccount {
  public accountId: string

  public async deactivate(accountId: string): Promise<void> {
    this.accountId = accountId
  }
}
