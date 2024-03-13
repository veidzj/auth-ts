import { MongoRepository } from '@/infra/db/mongodb/common'
import { type ChangeEmailRepository } from '@/application/protocols/commands'

export class ChangeEmailMongoRepository extends MongoRepository implements ChangeEmailRepository {
  public async change(currentEmail: string, newEmail: string): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      email: currentEmail
    }, {
      $set: {
        email: newEmail,
        updatedAt: new Date()
      }
    })
  }
}
