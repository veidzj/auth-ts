import { type AddConfirmationCodeRepository } from '@/application/protocols/commands'
import { faker } from '@faker-js/faker'

export class AddConfirmationCodeRepositorySpy implements AddConfirmationCodeRepository {
  public confirmationCode: string
  public insertedId: string = faker.database.mongodbObjectId()

  public async add(confirmationCode: string): Promise<string> {
    this.confirmationCode = confirmationCode
    return this.insertedId
  }
}
