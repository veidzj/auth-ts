import { faker } from '@faker-js/faker'

import { type GetAccountIdByToken } from '@/domain/usecases/queries'

export class GetAccountIdByTokenSpy implements GetAccountIdByToken {
  public input: GetAccountIdByToken.Input
  public output: GetAccountIdByToken.Output = {
    accountId: faker.string.uuid()
  }

  public async get(input: GetAccountIdByToken.Input): Promise<GetAccountIdByToken.Output> {
    this.input = input
    return this.output
  }
}
