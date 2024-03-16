import { type ChangePassword } from '@/domain/usecases/commands'

export class ChangePasswordSpy implements ChangePassword {
  public email: string
  public newPassword: string

  public async change(email: string, newPassword: string): Promise<void> {
    this.email = email
    this.newPassword = newPassword
  }
}
