import { MongoRepository } from '@/infra/db/mongodb/common'
import { type AddConfirmationCodeRepository } from '@/application/protocols/commands'

export class AddConfirmationCodeMongoRepository extends MongoRepository implements AddConfirmationCodeRepository {
  public async add(confirmationCode: string, accountId: string): Promise<string> {
    await this.createTTLIndex()
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

  private async createTTLIndex(): Promise<void> {
    const codeCollection = this.mongoHelper.getCollection('codes')
    const indexExists = await codeCollection.indexExists('expirationDate_1')
    if (!indexExists) {
      await codeCollection.createIndex({ expirationDate: 1 }, { expireAfterSeconds: 600 })
    }
  }
}
