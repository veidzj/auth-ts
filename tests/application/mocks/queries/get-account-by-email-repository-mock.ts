import { faker } from '@faker-js/faker'

import { type GetAccountByEmailRepository } from '@/application/protocols/queries'

export class GetAccountByEmailRepositorySpy implements GetAccountByEmailRepository {
  public email: string
  public output: GetAccountByEmailRepository.Output | null = {
    id: faker.string.uuid(),
    password: faker.internet.password()
  }

  public async get(email: string): Promise<GetAccountByEmailRepository.Output | null> {
    this.email = email
    return this.output
  }
}
