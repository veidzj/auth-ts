import { faker } from '@faker-js/faker'

import { type GetAccountIdByToken } from '@/domain/usecases/queries'

export class GetAccountIdByTokenSpy implements GetAccountIdByToken {
  public accessToken: string
  public role: string
  public accountId: string = faker.string.uuid()

  public async get(accessToken: string, role: string): Promise<string> {
    this.accessToken = accessToken
    this.role = role
    return this.accountId
  }
}
