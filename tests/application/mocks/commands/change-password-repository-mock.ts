import { type ChangePasswordRepository } from '@/application/protocols/commands'

export class ChangePasswordRepositorySpy implements ChangePasswordRepository {
  public accountId: string
  public newPassword: string

  public async change(accountId: string, newPassword: string): Promise<void> {
    this.accountId = accountId
    this.newPassword = newPassword
  }
}
