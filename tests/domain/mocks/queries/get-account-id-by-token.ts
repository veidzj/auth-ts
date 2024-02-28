import { type GetAccountIdByToken } from '@/domain/usecases/queries'

export class GetAccountIdByTokenSpy implements GetAccountIdByToken {
  public input: GetAccountIdByToken.Input
  public output: GetAccountIdByToken.Output

  public async get(input: GetAccountIdByToken.Input): Promise<GetAccountIdByToken.Output> {
    this.input = input
    return this.output
  }
}
