import { MongoRepository } from '@/infra/db/mongodb/common'
import { type VerifyConfirmationCodeRepository } from '@/application/protocols/queries'

export class VerifyConfirmationCodeMongoRepository extends MongoRepository implements VerifyConfirmationCodeRepository {
  public async verify(accountId: string, confirmationCode: string): Promise<boolean> {
    const codeCollection = this.mongoHelper.getCollection('codes')
    const count = await codeCollection.countDocuments({
      accountId,
      confirmationCode,
      expirationDate: {
        $gte: new Date()
      }
    })
    return count > 0
  }
}
