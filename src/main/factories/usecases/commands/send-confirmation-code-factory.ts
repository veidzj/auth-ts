import { type SendConfirmationCode } from '@/domain/usecases/commands'
import { DbSendConfirmationCode } from '@/application/usecases/commands'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/queries'
import { AddConfirmationCodeMongoRepository } from '@/infra/db/mongodb/commands'
import { NodemailerAdapter } from '@/infra/services'
import { env } from '@/main/config'

export class SendConfirmationCodeFactory {
  public static readonly makeSendConfirmationCode = (): SendConfirmationCode => {
    const checkAccountByEmailRepository = new CheckAccountByEmailMongoRepository()
    const addConfirmationCodeRepository = new AddConfirmationCodeMongoRepository()
    const sendConfirmationCodeToEmail = new NodemailerAdapter({
      host: env.smtpHost,
      port: Number(env.smtpPort),
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass
      }
    })
    return new DbSendConfirmationCode(checkAccountByEmailRepository, addConfirmationCodeRepository, sendConfirmationCodeToEmail)
  }
}
