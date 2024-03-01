import { faker } from '@faker-js/faker'

import { type GetAccountIdByTokenRepository } from '@/application/protocols/queries'

export class GetAccountIdByTokenRepositorySpy implements GetAccountIdByTokenRepository {
  public input: GetAccountIdByTokenRepository.Input
  public output: GetAccountIdByTokenRepository.Output | null = {
    accountId: faker.string.uuid()
  }

  public async get(input: GetAccountIdByTokenRepository.Input): Promise<GetAccountIdByTokenRepository.Output | null> {
    this.input = input
    return this.output
  }
}
