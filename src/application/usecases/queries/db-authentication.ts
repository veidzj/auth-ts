import { type GetAccountByEmailRepository } from '@/application/protocols/queries'
import { type HashComparer, type Encrypter } from '@/application/protocols/cryptography'
import { type Authentication } from '@/domain/usecases/queries'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  public async auth(input: Authentication.Input): Promise<Authentication.Output> {
    const account = await this.getAccountByEmailRepository.get(input.email)
    if (!account) {
      throw new AccountNotFoundError()
    }
    const isMatch = await this.hashComparer.compare(input.password, account.password)
    if (!isMatch) {
      throw new InvalidCredentialsError()
    }
    await this.encrypter.encrypt(account.id)
    return {
      accessToken: ''
    }
  }
}
