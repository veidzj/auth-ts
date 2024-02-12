import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type AddAccountRepository } from '@/application/protocols/commands'
import { type AddAccount } from '@/domain/usecases/commands'
import { AccountAlreadyExists } from '@/domain/errors'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public async add(input: AddAccount.Input): Promise<void> {
    const accountAlreadyExists = await this.checkAccountByEmailRepository.check(input.email)
    if (accountAlreadyExists) {
      throw new AccountAlreadyExists()
    }
    await this.addAccountRepository.add(input)
  }
}
