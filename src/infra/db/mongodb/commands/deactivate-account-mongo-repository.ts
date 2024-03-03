import { MongoRepository } from '@/infra/db/mongodb/common'
import { type DeactivateAccountRepository } from '@/application/protocols/commands'

export class DeactivateAccountMongoRepository extends MongoRepository implements DeactivateAccountRepository {
  public async deactivate(accountId: string): Promise<boolean> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const query = await accountCollection.updateOne({
      id: accountId
    }, {
      $set: {
        isActive: false
      }
    })
    return query.modifiedCount > 0
  }
}
