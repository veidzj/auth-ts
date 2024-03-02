import { type DeactivateAccountRepository } from '@/application/protocols/commands'

export class DeactivateAccountRepositorySpy implements DeactivateAccountRepository {
  public input: DeactivateAccountRepository.Input
  public output: boolean = true

  public async deactivate(input: DeactivateAccountRepository.Input): Promise<boolean> {
    this.input = input
    return this.output
  }
}
