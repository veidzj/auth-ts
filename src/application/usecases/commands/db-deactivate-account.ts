import { type DeactivateAccountRepository } from '@/application/protocols/commands'
import { type CheckAccountByIdRepository } from '@/application/protocols/queries'
import { type DeactivateAccount } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class DbDeactivateAccount implements DeactivateAccount {
  constructor(
    private readonly checkAccountByIdRepository: CheckAccountByIdRepository,
    private readonly deactivateAccountRepository: DeactivateAccountRepository
  ) {}

  public async deactivate(input: DeactivateAccount.Input): Promise<void> {
    const account = await this.checkAccountByIdRepository.check(input.accountId)
    if (!account) {
      throw new AccountNotFoundError()
    }
    await this.deactivateAccountRepository.deactivate(input)
  }
}
