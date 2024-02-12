import { faker } from '@faker-js/faker'

import { type AddAccount } from '@/domain/usecases/commands'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input
  public output: AddAccount.Output = {
    accessToken: faker.string.uuid()
  }

  public async add(input: AddAccount.Input): Promise<AddAccount.Output> {
    this.input = input
    return this.output
  }
}
