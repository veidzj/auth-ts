import { type Authentication } from '@/domain/usecases/queries'
import { type GetAccountByEmailRepository } from '@/application/protocols/queries'
import { AccountNotFoundError } from '@/domain/errors'

export class DbAuthentication implements Authentication {
  constructor(private readonly getAccountByEmailRepository: GetAccountByEmailRepository) {}

  public async auth(input: Authentication.Input): Promise<Authentication.Output> {
    const account = await this.getAccountByEmailRepository.get(input.email)
    if (!account) {
      throw new AccountNotFoundError()
    }
    return {
      accessToken: ''
    }
  }
}
