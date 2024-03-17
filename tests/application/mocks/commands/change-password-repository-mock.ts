import { type ChangePasswordRepository } from '@/application/protocols/commands'

export class ChangePasswordRepositorySpy implements ChangePasswordRepository {
  public email: string
  public newPassword: string

  public async change(email: string, newPassword: string): Promise<void> {
    this.email = email
    this.newPassword = newPassword
  }
}
