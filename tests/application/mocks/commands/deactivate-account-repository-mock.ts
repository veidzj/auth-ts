import { type DeactivateAccountRepository } from '@/application/protocols/commands'

export class DeactivateAccountRepositorySpy implements DeactivateAccountRepository {
  public input: DeactivateAccountRepository.Input

  public async deactivate(input: DeactivateAccountRepository.Input): Promise<void> {
    this.input = input
  }
}
