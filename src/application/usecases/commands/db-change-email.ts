import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type ChangeEmail } from '@/domain/usecases/commands'
import { AccountNotFoundError, AccountAlreadyExistsError } from '@/domain/errors'

export class DbChangeEmail implements ChangeEmail {
  constructor(private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}

  public async change(currentEmail: string, newEmail: string): Promise<void> {
    const accountWithCurrentEmailExists = await this.checkAccountByEmailRepository.check(currentEmail)
    if (!accountWithCurrentEmailExists) {
      throw new AccountNotFoundError()
    }
    const accountWithNewEmailExists = await this.checkAccountByEmailRepository.check(newEmail)
    if (accountWithNewEmailExists) {
      throw new AccountAlreadyExistsError()
    }
  }
}
