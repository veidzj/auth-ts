import { type DeactivateAccountRepository } from '@/application/protocols/commands'

export class DeactivateAccountRepositorySpy implements DeactivateAccountRepository {
  public accountId: string
  public output: boolean = true

  public async deactivate(accountId: string): Promise<boolean> {
    this.accountId = accountId
    return this.output
  }
}
