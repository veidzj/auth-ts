import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type ChangePassword } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class DbChangePassword implements ChangePassword {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  public async change(email: string, password: string): Promise<void> {
    const accountExists = await this.checkAccountByEmailRepository.check(email)
    if (!accountExists) {
      throw new AccountNotFoundError()
    }
  }
}
