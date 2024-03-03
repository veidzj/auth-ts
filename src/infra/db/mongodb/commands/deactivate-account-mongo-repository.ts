import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type DeactivateAccountRepository } from '@/application/protocols/commands'

export class DeactivateAccountMongoRepository implements DeactivateAccountRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

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
