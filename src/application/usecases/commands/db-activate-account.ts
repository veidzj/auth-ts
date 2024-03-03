import { type CheckAccountByIdRepository } from '@/application/protocols/queries'
import { type ActivateAccount } from '@/domain/usecases/commands'

export class DbActivateAccount implements ActivateAccount {
  constructor(
    private readonly checkAccountByIdRepository: CheckAccountByIdRepository
  ) {}

  public async activate(accountId: string): Promise<void> {
    await this.checkAccountByIdRepository.check(accountId)
  }
}
