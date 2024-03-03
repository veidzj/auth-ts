import { type CheckAccountByIdRepository } from '@/application/protocols/queries'
import { type ActivateAccount } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class DbActivateAccount implements ActivateAccount {
  constructor(
    private readonly checkAccountByIdRepository: CheckAccountByIdRepository
  ) {}

  public async activate(accountId: string): Promise<void> {
    const account = await this.checkAccountByIdRepository.check(accountId)
    if (!account) {
      throw new AccountNotFoundError()
    }
  }
}
