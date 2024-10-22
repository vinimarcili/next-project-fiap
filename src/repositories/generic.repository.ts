import { client } from "@/clients/mongo.client"
import { MongoClient, Collection, ObjectId, Filter, WithId } from "mongodb"

export class GenericRepository<T extends Document> {
  private client: MongoClient
  private collection: Collection<T>

  constructor(collectionName: string) {
    this.client = client
    this.collection = this.client.db(process.env.MONGO_DATABASE).collection(collectionName)
  }

  async findAll(query: Filter<T> = {}): Promise<WithId<T>[]> {
    return this.collection.find(query).toArray()
  }

  // Método para buscar um documento por ID
  async findOne(id: string): Promise<WithId<T> | null> {
    return this.collection.findOne({ _id: new ObjectId(id) } as Filter<T>) // Converte o id para ObjectId
  }

  // Método para inserir ou atualizar um documento
  async upsert(id: string, document: T): Promise<T> {
    await this.collection.updateOne(
      { _id: new ObjectId(id) } as Filter<T>,
      { $set: document },
      { upsert: true }
    )
    // Retorna o documento atualizado ou inserido
    return { ...document, _id: id } as T // Adiciona o ID ao documento
  }

  // Método para deletar um documento por ID
  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) } as Filter<T>)
    return result.deletedCount === 1 // Retorna true se um documento foi deletado
  }
}

