import { type AddConfirmationCodeRepository } from '@/application/protocols/commands'
import { faker } from '@faker-js/faker'

export class AddConfirmationCodeRepositorySpy implements AddConfirmationCodeRepository {
  public confirmationCode: string
  public accountId: string
  public insertedId: string = faker.database.mongodbObjectId()

  public async add(confirmationCode: string, accountId: string): Promise<string> {
    this.confirmationCode = confirmationCode
    this.accountId = accountId
    return this.insertedId
  }
}
