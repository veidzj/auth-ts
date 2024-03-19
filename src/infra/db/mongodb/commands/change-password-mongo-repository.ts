import { ObjectId } from 'mongodb'

import { MongoRepository } from '@/infra/db/mongodb/common'
import { type ChangePasswordRepository } from '@/application/protocols/commands'

export class ChangePasswordMongoRepository extends MongoRepository implements ChangePasswordRepository {
  public async change(accountId: string, newPassword: string): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(accountId)
    }, {
      $set: {
        password: newPassword,
        updatedAt: new Date()
      }
    })
  }
}
