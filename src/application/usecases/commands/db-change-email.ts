import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type ChangeEmail } from '@/domain/usecases/commands'
import { AccountAlreadyExistsError } from '@/domain/errors'
import { type ChangeEmailRepository } from '@/application/protocols/commands'

export class DbChangeEmail implements ChangeEmail {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly changeEmailRepository: ChangeEmailRepository
  ) {}

  public async change(currentEmail: string, newEmail: string): Promise<void> {
    const accountWithNewEmailExists = await this.checkAccountByEmailRepository.check(newEmail)
    if (accountWithNewEmailExists) {
      throw new AccountAlreadyExistsError()
    }
    await this.changeEmailRepository.change(currentEmail, newEmail)
  }
}
