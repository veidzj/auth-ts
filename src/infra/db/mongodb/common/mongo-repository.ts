import { MongoHelper } from '@/infra/db/mongodb/helpers'

export class MongoRepository {
  public readonly mongoHelper: MongoHelper = MongoHelper.getInstance()
}
