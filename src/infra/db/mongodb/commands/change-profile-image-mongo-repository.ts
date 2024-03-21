import { ObjectId } from 'mongodb'

import { MongoRepository } from '@/infra/db/mongodb/common'
import { type ChangeProfileImageRepository } from '@/application/protocols/commands'

export class ChangeProfileImageMongoRepository extends MongoRepository implements ChangeProfileImageRepository {
  public async change(accountId: string, newProfileImage: string): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(accountId)
    }, {
      $set: {
        profileImage: newProfileImage,
        updatedAt: new Date()
      }
    })
  }
}
