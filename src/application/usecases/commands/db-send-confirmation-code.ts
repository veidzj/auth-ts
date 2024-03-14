import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type SendConfirmationCode } from '@/domain/usecases/commands'

export class DbSendConfirmationCode implements SendConfirmationCode {
  constructor(private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}

  public async send(email: string): Promise<void> {
    await this.checkAccountByEmailRepository.check(email)
  }
}
