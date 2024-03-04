import { MongoRepository } from '@/infra/db/mongodb/common'
import { type GetAccountByEmailRepository } from '@/application/protocols/queries'

export class GetAccountByEmailMongoRepository extends MongoRepository implements GetAccountByEmailRepository {
  public async get(email: string): Promise<GetAccountByEmailRepository.Output | null> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        password: 1
      }
    })
    return account && this.mongoHelper.mapDocument<GetAccountByEmailRepository.Output>(account)
  }
}
