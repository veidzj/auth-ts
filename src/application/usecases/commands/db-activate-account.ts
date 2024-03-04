import { type CheckAccountByIdRepository } from '@/application/protocols/queries'
import { type ActivateAccountRepository } from '@/application/protocols/commands'
import { type ActivateAccount } from '@/domain/usecases/commands'
import { AccountNotFoundError, AccountAlreadyActivatedError } from '@/domain/errors'

export class DbActivateAccount implements ActivateAccount {
  constructor(
    private readonly checkAccountByIdRepository: CheckAccountByIdRepository,
    private readonly activateAccountRepository: ActivateAccountRepository
  ) {}

  public async activate(accountId: string): Promise<void> {
    const account = await this.checkAccountByIdRepository.check(accountId)
    if (!account) {
      throw new AccountNotFoundError()
    }
    const accountActivated = await this.activateAccountRepository.activate(accountId)
    if (!accountActivated) {
      throw new AccountAlreadyActivatedError()
    }
  }
}
