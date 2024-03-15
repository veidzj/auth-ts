import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type AddConfirmationCodeRepository } from '@/application/protocols/commands'
import { type SendConfirmationCodeToEmail } from '@/application/protocols/services'
import { GenerateConfirmationCode } from '@/application/helpers'
import { type SendConfirmationCode } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class DbSendConfirmationCode implements SendConfirmationCode {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly addConfirmationCodeRepository: AddConfirmationCodeRepository,
    private readonly sendConfirmationCodeToEmail: SendConfirmationCodeToEmail
  ) {}

  public async send(email: string, accountId: string): Promise<string> {
    const account = await this.checkAccountByEmailRepository.check(email)
    if (!account) {
      throw new AccountNotFoundError()
    }
    const confirmationCode = GenerateConfirmationCode.generate()
    const insertedId = await this.addConfirmationCodeRepository.add(confirmationCode, accountId)
    await this.sendConfirmationCodeToEmail.send(confirmationCode, email)
    return insertedId
  }
}
