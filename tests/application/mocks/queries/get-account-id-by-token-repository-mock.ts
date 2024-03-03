import { faker } from '@faker-js/faker'

import { type GetAccountIdByTokenRepository } from '@/application/protocols/queries'

export class GetAccountIdByTokenRepositorySpy implements GetAccountIdByTokenRepository {
  public accessToken: string
  public role: string
  public accountId: string | null = faker.string.uuid()

  public async get(accessToken: string, role: string): Promise<string | null> {
    this.accessToken = accessToken
    this.role = role
    return this.accountId
  }
}
