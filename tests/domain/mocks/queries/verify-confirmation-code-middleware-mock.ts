import { type VerifyConfirmationCode } from '@/domain/usecases/queries'

export class VerifyConfirmationCodeSpy implements VerifyConfirmationCode {
  public accountId: string
  public confirmationCode: string

  public async verify(accountId: string, confirmationCode: string): Promise<void> {
    this.accountId = accountId
    this.confirmationCode = confirmationCode
  }
}
