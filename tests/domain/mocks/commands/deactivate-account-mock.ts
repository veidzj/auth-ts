import { type DeactivateAccount } from '@/domain/usecases/commands'

export class DeactivateAccountSpy implements DeactivateAccount {
  public input: DeactivateAccount.Input

  public async deactivate(input: DeactivateAccount.Input): Promise<void> {
    this.input = input
  }
}
