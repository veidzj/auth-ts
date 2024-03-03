import { type GetAccountByEmailRepository } from '@/application/protocols/queries'
import { type HashComparer, type Encrypter } from '@/application/protocols/cryptography'
import { type UpdateAccessTokenRepository } from '@/application/protocols/commands'
import { type Authentication } from '@/domain/usecases/queries'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly getAccountByEmailRepository: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  public async auth(email: string, password: string): Promise<string> {
    const account = await this.getAccountByEmailRepository.get(email)
    if (!account) {
      throw new AccountNotFoundError()
    }
    const isMatch = await this.hashComparer.compare(password, account.password)
    if (!isMatch) {
      throw new InvalidCredentialsError()
    }
    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.update({ id: account.id, accessToken })
    return accessToken
  }
}
