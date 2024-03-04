import { type ActivateAccountRepository } from '@/application/protocols/commands'

export class ActivateAccountRepositorySpy implements ActivateAccountRepository {
  public accountId: string
  public output: boolean = true

  public async activate(accountId: string): Promise<boolean> {
    this.accountId = accountId
    return this.output
  }
}
