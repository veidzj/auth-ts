import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetAccountIdByTokenRepository } from '@/application/protocols/queries'

export class GetAccountIdByTokenMongoRepository implements GetAccountIdByTokenRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

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
    return {
      accountId: account?.id
    }
  }
}
