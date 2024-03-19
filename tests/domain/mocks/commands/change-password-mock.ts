import { type ChangePassword } from '@/domain/usecases/commands'

export class ChangePasswordSpy implements ChangePassword {
  public accountId: string
  public newPassword: string

  public async change(accountId: string, newPassword: string): Promise<void> {
    this.accountId = accountId
    this.newPassword = newPassword
  }
}
