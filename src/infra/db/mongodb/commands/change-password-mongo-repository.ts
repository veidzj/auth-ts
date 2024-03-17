import { MongoRepository } from '@/infra/db/mongodb/common'
import { type ChangePasswordRepository } from '@/application/protocols/commands'

export class ChangePasswordMongoRepository extends MongoRepository implements ChangePasswordRepository {
  public async change(email: string, newPassword: string): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      email
    }, {
      $set: {
        password: newPassword,
        updatedAt: new Date()
      }
    })
  }
}
