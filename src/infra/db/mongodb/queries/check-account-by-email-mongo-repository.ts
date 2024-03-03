import { MongoRepository } from '@/infra/db/mongodb/common'
import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'

export class CheckAccountByEmailMongoRepository extends MongoRepository implements CheckAccountByEmailRepository {
  public async check(email: string): Promise<boolean> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const count = await accountCollection.countDocuments({ email })
    return count > 0
  }
}
