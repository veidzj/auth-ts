import { MongoRepository } from '@/infra/db/mongodb/common'
import { type LogErrorRepository } from '@/application/protocols/commands'

export class LogErrorMongoRepository extends MongoRepository implements LogErrorRepository {
  public async log(stack: string): Promise<string> {
    const errorCollection = this.mongoHelper.getCollection('errors')
    const query = await errorCollection.insertOne({
      stack,
      date: new Date()
    })
    return query.insertedId.toString()
  }
}
