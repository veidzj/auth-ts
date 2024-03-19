import { type VerifyConfirmationCodeRepository } from '@/application/protocols/queries'

export class VerifyConfirmationCodeRepositorySpy implements VerifyConfirmationCodeRepository {
  public accountId: string
  public confirmationCode: string
  public output: boolean = true

  public async verify(accountId: string, confirmationCode: string): Promise<boolean> {
    this.accountId = accountId
    this.confirmationCode = confirmationCode
    return this.output
  }
}
