import { type ChangeEmail } from '@/domain/usecases/commands'

export class ChangeEmailSpy implements ChangeEmail {
  public currentEmail: string
  public newEmail: string

  public async change(currentEmail: string, newEmail: string): Promise<void> {
    this.currentEmail = currentEmail
    this.newEmail = newEmail
  }
}
