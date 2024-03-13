import { ObjectId } from 'mongodb'

import { MongoRepository } from '@/infra/db/mongodb/common'
import { type ActivateAccountRepository } from '@/application/protocols/commands'

export class ActivateAccountMongoRepository extends MongoRepository implements ActivateAccountRepository {
  public async activate(accountId: string): Promise<boolean> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const query = await accountCollection.updateOne({
      _id: new ObjectId(accountId),
      isActive: { $ne: true }
    }, {
      $set: {
        isActive: true,
        updatedAt: new Date()
      }
    })
    return query.modifiedCount > 0
  }
}
