import { type Decrypter } from '@/application/protocols/cryptography'
import { type GetAccountIdByTokenRepository } from '@/application/protocols/queries'
import { AccessDeniedError } from '@/domain/errors'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'

export class DbGetAccountIdByToken implements GetAccountIdByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly getAccountIdByTokenRepository: GetAccountIdByTokenRepository
  ) {}

  public async get(input: GetAccountIdByToken.Input): Promise<GetAccountIdByToken.Output> {
    await this.decrypter.decrypt(input.accessToken)
    const accountId = await this.getAccountIdByTokenRepository.get(input)
    if (!accountId) {
      throw new AccessDeniedError()
    }
    return accountId
  }
}
