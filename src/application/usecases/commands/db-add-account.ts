import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type AddAccountRepository } from '@/application/protocols/commands'
import { type AddAccount } from '@/domain/usecases/commands'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public async add(input: AddAccount.Input): Promise<void> {
    await this.checkAccountByEmailRepository.check(input.email)
    await this.addAccountRepository.add(input)
  }
}
