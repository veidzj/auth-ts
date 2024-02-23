import { type Authentication } from '@/domain/usecases/queries'
import { type GetAccountByEmailRepository } from '@/application/protocols/queries'

export class DbAuthentication implements Authentication {
  constructor(private readonly getAccountByEmailRepository: GetAccountByEmailRepository) {}

  public async auth(input: Authentication.Input): Promise<Authentication.Output> {
    await this.getAccountByEmailRepository.get(input.email)
    return {
      accessToken: ''
    }
  }
}
