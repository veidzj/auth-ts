import { type ChangeEmailRepository } from '@/application/protocols/commands'

export class ChangeEmailRepositorySpy implements ChangeEmailRepository {
  public currentEmail: string
  public newEmail: string

  public async change(currentEmail: string, newEmail: string): Promise<void> {
    this.currentEmail = currentEmail
    this.newEmail = newEmail
  }
}
