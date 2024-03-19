import { type CheckAccountByIdRepository } from '@/application/protocols/queries'
import { type Hasher } from '@/application/protocols/cryptography'
import { type ChangePasswordRepository } from '@/application/protocols/commands'
import { type ChangePassword } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class DbChangePassword implements ChangePassword {
  constructor(
    private readonly checkAccountByIdRepository: CheckAccountByIdRepository,
    private readonly hasher: Hasher,
    private readonly changePasswordRepository: ChangePasswordRepository
  ) {}

  public async change(accountId: string, newPassword: string): Promise<void> {
    const accountExists = await this.checkAccountByIdRepository.check(accountId)
    if (!accountExists) {
      throw new AccountNotFoundError()
    }
    const hashedPassword = await this.hasher.hash(newPassword)
    await this.changePasswordRepository.change(accountId, hashedPassword)
  }
}
