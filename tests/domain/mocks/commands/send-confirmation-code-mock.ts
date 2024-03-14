import { type SendConfirmationCode } from '@/domain/usecases/commands'

export class SendConfirmationCodeSpy implements SendConfirmationCode {
  public email: string

  public async send(email: string): Promise<void> {
    this.email = email
  }
}
