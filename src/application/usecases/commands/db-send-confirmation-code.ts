import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type SendConfirmationCode } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class DbSendConfirmationCode implements SendConfirmationCode {
  constructor(private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}

  public async send(email: string): Promise<void> {
    const account = await this.checkAccountByEmailRepository.check(email)
    if (!account) {
      throw new AccountNotFoundError()
    }
  }
}
