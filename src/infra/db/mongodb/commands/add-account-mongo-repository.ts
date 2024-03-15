import { MongoRepository } from '@/infra/db/mongodb/common'
import { type AddAccountRepository } from '@/application/protocols/commands'

export class AddAccountMongoRepository extends MongoRepository implements AddAccountRepository {
  public async add(input: AddAccountRepository.Input): Promise<string> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const query = await accountCollection.insertOne(input)
    return query.insertedId.toString()
  }
}
