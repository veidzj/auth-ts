import { ObjectId } from 'mongodb'

import { MongoRepository } from '@/infra/db/mongodb/common'
import { type UpdateAccessTokenRepository } from '@/application/protocols/commands'

export class UpdateAccessTokenMongoRepository extends MongoRepository implements UpdateAccessTokenRepository {
  public async update(id: string, accessToken: string): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken,
        updatedAt: new Date()
      }
    })
  }
}
