import { MongoRepository } from '@/infra/db/mongodb/common'
import { type GetAccountIdByTokenRepository } from '@/application/protocols/queries'

export class GetAccountIdByTokenMongoRepository extends MongoRepository implements GetAccountIdByTokenRepository {
  public async get(input: GetAccountIdByTokenRepository.Input): Promise<GetAccountIdByTokenRepository.Output | null> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: input.accessToken,
      roles: {
        $in: [input.role]
      }
    }, {
      projection: {
        _id: 0,
        id: 1
      }
    })
    return account && {
      accountId: account?.id
    }
  }
}
