import { type GetAccountIdByTokenRepository } from '@/application/protocols/queries'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'

export class DbGetAccountIdByToken implements GetAccountIdByToken {
  constructor(private readonly getAccountIdByTokenRepository: GetAccountIdByTokenRepository) {}

  public async get(input: GetAccountIdByToken.Input): Promise<GetAccountIdByToken.Output> {
    await this.getAccountIdByTokenRepository.get(input)
    return {
      accountId: ''
    }
  }
}
