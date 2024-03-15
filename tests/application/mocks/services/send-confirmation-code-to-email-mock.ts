import { type SendConfirmationCodeToEmail } from '@/application/protocols/services'

export class SendConfirmationCodeToEmailSpy implements SendConfirmationCodeToEmail {
  public confirmationCode: string
  public email: string

  public async send(confirmationCode: string, email: string): Promise<void> {
    this.confirmationCode = confirmationCode
    this.email = email
  }
}
