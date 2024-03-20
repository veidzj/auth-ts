import { type VerifyConfirmationCodeRepository } from '@/application/protocols/queries'
import { type VerifyConfirmationCode } from '@/domain/usecases/queries'
import { InvalidOrExpiredConfirmationCodeError } from '@/domain/errors'

export class DbVerifyConfirmationCode implements VerifyConfirmationCode {
  constructor(private readonly verifyConfirmationCodeRepository: VerifyConfirmationCodeRepository) {}

  public async verify(accountId: string, confirmationCode: string): Promise<void> {
    const confirmationCodeIsValid = await this.verifyConfirmationCodeRepository.verify(accountId, confirmationCode)
    if (!confirmationCodeIsValid) {
      throw new InvalidOrExpiredConfirmationCodeError()
    }
  }
}
