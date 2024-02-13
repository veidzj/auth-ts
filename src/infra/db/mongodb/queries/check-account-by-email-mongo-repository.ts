import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type CheckAccountByEmailRepository } from '@/application/protocols/queries'

export class CheckAccountByEmailMongoRepository implements CheckAccountByEmailRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async check(email: string): Promise<boolean> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const count = await accountCollection.countDocuments({ email })
    return count > 0
  }
}
