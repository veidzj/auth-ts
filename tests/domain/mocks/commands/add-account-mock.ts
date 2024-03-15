import { faker } from '@faker-js/faker'

import { type AddAccount } from '@/domain/usecases/commands'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input
  public insertedId: string = faker.database.mongodbObjectId()

  public async add(input: AddAccount.Input): Promise<string> {
    this.input = input
    return this.insertedId
  }
}
