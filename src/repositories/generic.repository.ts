import { client } from "@/clients/mongo.client"
import { MongoClient, Collection, ObjectId, Filter, WithId, Document } from "mongodb"

export class GenericRepository<T extends Document> {
  private collection: Collection<T>

  constructor(collectionName: string) {
    this.collection = client.db(process.env.MONGO_DATABASE).collection(collectionName)
  }

  async findAll(query: Filter<T> = {}): Promise<WithId<T>[]> {
    return await this.collection.find(query).toArray()
  }

  // Método para buscar um documento por ID
  async findOne(query: Filter<T> = {}): Promise<WithId<T> | null> {
    return await this.collection.findOne(query as Filter<T>)
  }

  // Método para inserir ou atualizar um documento
  async upsert(query: Filter<T> = {}, document: T): Promise<T> {
    const response = await this.collection.updateOne(
      query as Filter<T>,
      { $set: document },
      { upsert: true }
    )
    return { ...document, _id: response.upsertedId }
  }

  // Método para deletar um documento por ID
  async delete(query: Filter<T> = {}): Promise<boolean> {
    const result = await this.collection.deleteOne(query as Filter<T>)
    return result.deletedCount > 0
  }
}
