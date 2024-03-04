import { MongoClient, type Collection, type WithId, type Document } from 'mongodb'

export class MongoHelper {
  private static instance: MongoHelper
  private client: MongoClient | null = null

  public static getInstance(): MongoHelper {
    if (!MongoHelper.instance) {
      MongoHelper.instance = new MongoHelper()
    }

    return MongoHelper.instance
  }

  public async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
  }

  public getCollection(name: string): Collection {
    if (!this.client) {
      throw new Error('No active connection to the database')
    }
    return this.client.db().collection(name)
  }

  public mapId(mongoDoc: WithId<Document>): string {
    return mongoDoc._id.toHexString()
  }

  public mapDocument<T>(mongoDoc: WithId<Document>): T {
    const { _id, ...rest } = mongoDoc
    const mappedDocument = { ...rest, id: _id.toHexString() }
    return mappedDocument as T
  }
}
