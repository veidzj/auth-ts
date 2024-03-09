import { faker } from '@faker-js/faker'

import { type Authentication } from '@/domain/usecases/commands'

export class AuthenticationSpy implements Authentication {
  public email: string
  public password: string
  public accessToken: string = faker.string.uuid()

  public async auth(email: string, password: string): Promise<string> {
    this.email = email
    this.password = password
    return this.accessToken
  }
}
