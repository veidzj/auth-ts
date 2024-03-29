import { type DeactivateAccountRepository } from '@/application/protocols/commands'
import { type CheckAccountByIdRepository } from '@/application/protocols/queries'
import { type DeactivateAccount } from '@/domain/usecases/commands'
import { AccountNotFoundError, AccountAlreadyDeactivatedError } from '@/domain/errors'

export class DbDeactivateAccount implements DeactivateAccount {
  constructor(
    private readonly checkAccountByIdRepository: CheckAccountByIdRepository,
    private readonly deactivateAccountRepository: DeactivateAccountRepository
  ) {}

  public async deactivate(accountId: string): Promise<void> {
    const account = await this.checkAccountByIdRepository.check(accountId)
    if (!account) {
      throw new AccountNotFoundError()
    }
    const accountDeactivated = await this.deactivateAccountRepository.deactivate(accountId)
    if (!accountDeactivated) {
      throw new AccountAlreadyDeactivatedError()
    }
  }
}
