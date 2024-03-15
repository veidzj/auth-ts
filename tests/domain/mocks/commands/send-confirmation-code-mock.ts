import { faker } from '@faker-js/faker'

import { type SendConfirmationCode } from '@/domain/usecases/commands'

export class SendConfirmationCodeSpy implements SendConfirmationCode {
  public email: string
  public accountId: string
  public insertedId: string = faker.database.mongodbObjectId()

  public async send(email: string, accountId: string): Promise<string> {
    this.email = email
    this.accountId = accountId
    return this.insertedId
  }
}
