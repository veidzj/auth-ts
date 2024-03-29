import { ObjectId } from 'mongodb'

import { MongoRepository } from '@/infra/db/mongodb/common'
import { type CheckAccountByIdRepository } from '@/application/protocols/queries'

export class CheckAccountByIdMongoRepository extends MongoRepository implements CheckAccountByIdRepository {
  public async check(id: string): Promise<boolean> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const count = await accountCollection.countDocuments({ _id: new ObjectId(id) })
    return count > 0
  }
}
