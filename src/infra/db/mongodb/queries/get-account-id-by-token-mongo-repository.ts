import { MongoRepository } from '@/infra/db/mongodb/common'
import { type GetAccountIdByTokenRepository } from '@/application/protocols/queries'

export class GetAccountIdByTokenMongoRepository extends MongoRepository implements GetAccountIdByTokenRepository {
  public async get(accessToken: string, role: string): Promise<string | null> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken,
      roles: {
        $in: [role]
      }
    }, {
      projection: {
        _id: 1
      }
    })
    return account && this.mongoHelper.mapId(account)
  }
}
