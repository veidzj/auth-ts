import { type DeactivateAccountRepository } from '@/application/protocols/commands'
import { type CheckAccountByIdRepository } from '@/application/protocols/queries'
import { type DeactivateAccount } from '@/domain/usecases/commands'

export class DbDeactivateAccount implements DeactivateAccount {
  constructor(
    private readonly checkAccountByIdRepository: CheckAccountByIdRepository,
    private readonly deactivateAccountRepository: DeactivateAccountRepository
  ) {}

  public async deactivate(input: DeactivateAccount.Input): Promise<void> {
    await this.checkAccountByIdRepository.check(input.accountId)
    await this.deactivateAccountRepository.deactivate(input)
  }
}
