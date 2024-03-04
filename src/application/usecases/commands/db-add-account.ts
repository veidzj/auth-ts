import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'
import { type Hasher } from '@/application/protocols/cryptography'
import { type AddAccountRepository } from '@/application/protocols/commands'
import { type AddAccount } from '@/domain/usecases/commands'
import { AccountAlreadyExistsError } from '@/domain/errors'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public async add(input: AddAccount.Input): Promise<void> {
    const accountAlreadyExists = await this.checkAccountByEmailRepository.check(input.email)
    if (accountAlreadyExists) {
      throw new AccountAlreadyExistsError()
    }
    const hashedPassword = await this.hasher.hash(input.password)
    await this.addAccountRepository.add({
      ...input,
      password: hashedPassword,
      isActive: true,
      roles: ['user'],
      createdAt: new Date()
    })
  }
}
