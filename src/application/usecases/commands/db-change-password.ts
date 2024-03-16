import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type ChangePasswordRepository } from '@/application/protocols/commands'
import { type ChangePassword } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class DbChangePassword implements ChangePassword {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly changePasswordRepository: ChangePasswordRepository
  ) {}

  public async change(email: string, newPassword: string): Promise<void> {
    const accountExists = await this.checkAccountByEmailRepository.check(email)
    if (!accountExists) {
      throw new AccountNotFoundError()
    }
    await this.changePasswordRepository.change(email, newPassword)
  }
}
