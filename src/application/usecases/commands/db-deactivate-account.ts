import { type DeactivateAccountRepository } from '@/application/protocols/commands'
import { type DeactivateAccount } from '@/domain/usecases/commands'

export class DbDeactivateAccount implements DeactivateAccount {
  constructor(private readonly deactivateAccountRepository: DeactivateAccountRepository) {}

  public async deactivate(input: DeactivateAccount.Input): Promise<void> {
    await this.deactivateAccountRepository.deactivate(input)
  }
}
