import { faker } from '@faker-js/faker'

import { type Authentication } from '@/domain/usecases/queries'

export class AuthenticationSpy implements Authentication {
  public input: Authentication.Input
  public output: Authentication.Output = {
    accessToken: faker.string.uuid()
  }

  public async auth(input: Authentication.Input): Promise<Authentication.Output> {
    this.input = input
    return this.output
  }
}
