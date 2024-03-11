import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type ChangeEmail } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class DbChangeEmail implements ChangeEmail {
  constructor(private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}

  public async change(currentEmail: string, newEmail: string): Promise<void> {
    const accountWithCurrentEmailExists = await this.checkAccountByEmailRepository.check(currentEmail)
    if (!accountWithCurrentEmailExists) {
      throw new AccountNotFoundError()
    }
    await this.checkAccountByEmailRepository.check(newEmail)
  }
}
