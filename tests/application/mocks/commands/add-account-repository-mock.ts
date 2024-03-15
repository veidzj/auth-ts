import { faker } from '@faker-js/faker'

import { type AddAccountRepository } from '@/application/protocols/commands'

export class AddAccountRepositorySpy implements AddAccountRepository {
  public input: AddAccountRepository.Input
  public insertedId: string = faker.database.mongodbObjectId()

  public async add(input: AddAccountRepository.Input): Promise<string> {
    this.input = input
    return this.insertedId
  }
}
