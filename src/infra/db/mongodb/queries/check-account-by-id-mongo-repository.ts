import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type CheckAccountByIdRepository } from '@/application/protocols/queries'

export class CheckAccountByIdMongoRepository implements CheckAccountByIdRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async check(id: string): Promise<boolean> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const count = await accountCollection.countDocuments({ id })
    return count > 0
  }
}
