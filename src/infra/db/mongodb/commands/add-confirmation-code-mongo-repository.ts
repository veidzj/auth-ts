import { MongoRepository } from '@/infra/db/mongodb/common'
import { type AddConfirmationCodeRepository } from '@/application/protocols/commands'

export class AddConfirmationCodeMongoRepository extends MongoRepository implements AddConfirmationCodeRepository {
  public async add(confirmationCode: string, accountId: string): Promise<string> {
    const codeCollection = this.mongoHelper.getCollection('codes')
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + 10)
    const query = await codeCollection.insertOne({
      confirmationCode,
      accountId,
      expirationDate
    })
    return query.insertedId.toString()
  }
}
