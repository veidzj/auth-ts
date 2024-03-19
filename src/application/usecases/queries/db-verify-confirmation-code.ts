import { type VerifyConfirmationCodeRepository } from '@/application/protocols/queries'
import { type VerifyConfirmationCode } from '@/domain/usecases/queries'

export class DbVerifyConfirmationCode implements VerifyConfirmationCode {
  constructor(private readonly verifyConfirmationCodeRepository: VerifyConfirmationCodeRepository) {}

  public async verify(accountId: string, confirmationCode: string): Promise<void> {
    await this.verifyConfirmationCodeRepository.verify(accountId, confirmationCode)
  }
}
