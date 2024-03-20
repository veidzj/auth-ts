import { type VerifyConfirmationCode } from '@/domain/usecases/queries'
import { DbVerifyConfirmationCode } from '@/application/usecases/queries'
import { VerifyConfirmationCodeMongoRepository } from '@/infra/db/mongodb/queries'

export class VerifyConfirmationCodeFactory {
  public static readonly makeVerifyConfirmationCode = (): VerifyConfirmationCode => {
    const verifyConfirmationCodeRepository = new VerifyConfirmationCodeMongoRepository()
    return new DbVerifyConfirmationCode(verifyConfirmationCodeRepository)
  }
}
