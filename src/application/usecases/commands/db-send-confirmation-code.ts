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

  public async send(email: string): Promise<void> {
    const account = await this.checkAccountByEmailRepository.check(email)
    if (!account) {
      throw new AccountNotFoundError()
    }
    const confirmationCode = GenerateConfirmationCode.generate()
    await this.addConfirmationCodeRepository.add(confirmationCode)
    await this.sendConfirmationCodeToEmail.send(confirmationCode, email)
  }
}
