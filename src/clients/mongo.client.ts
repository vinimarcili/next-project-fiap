import { MongoClient } from 'mongodb'

// A URI de conexão com o MongoDB, retirada das variáveis de ambiente
const uri = process.env.MONGODB_URI
// Opções adicionais para a conexão (pode ser vazio se não houver opções extras)
const options = {}

let client: MongoClient // Declaração da variável para armazenar o cliente MongoDB
let db: Promise<MongoClient> // Declaração da variável para armazenar a promessa de conexão ao MongoDB

// Se a URI não estiver definida, lançamos um erro indicando que a variável de ambiente MONGODB_URI está ausente
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

// Verifica se estamos em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, armazenamos a conexão no objeto global para evitar reconexões após reinicializações
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options) // Cria um novo cliente MongoDB
    global._mongoClientPromise = client.connect() // Conecta o cliente e armazena a promessa globalmente
  }
  db = global._mongoClientPromise // Reutiliza a promessa globalmente
} else {
  // Em produção, criamos um novo cliente e conectamos sem armazenar globalmente
  client = new MongoClient(uri, options)
  db = client.connect() // Conecta o cliente e armazena a promessa localmente
}

// Exporta a promessa de conexão e o cliente MongoDB para serem usados em outras partes da aplicação
export { db, client }
