import { MongoRepository } from '@/infra/db/mongodb/common'
import { type AddAccountRepository } from '@/application/protocols/commands'

export class AddAccountMongoRepository extends MongoRepository implements AddAccountRepository {
  public async add(input: AddAccountRepository.Input): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.insertOne(input)
  }
}
