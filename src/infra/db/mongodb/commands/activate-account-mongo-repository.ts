import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type ActivateAccountRepository } from '@/application/protocols/commands'

export class ActivateAccountMongoRepository implements ActivateAccountRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async activate(accountId: string): Promise<boolean> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const query = await accountCollection.updateOne({
      id: accountId
    }, {
      $set: {
        isActive: true
      }
    })
    return query.modifiedCount > 0
  }
}
