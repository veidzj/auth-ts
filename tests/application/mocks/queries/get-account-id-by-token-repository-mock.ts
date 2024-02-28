import { type GetAccountIdByTokenRepository } from '@/application/protocols/queries'

export class GetAccountIdByTokenRepositorySpy implements GetAccountIdByTokenRepository {
  public input: GetAccountIdByTokenRepository.Input
  public output: GetAccountIdByTokenRepository.Output

  public async get(input: GetAccountIdByTokenRepository.Input): Promise<GetAccountIdByTokenRepository.Output> {
    this.input = input
    return this.output
  }
}
