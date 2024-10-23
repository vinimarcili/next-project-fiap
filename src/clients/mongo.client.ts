import { MongoClient } from 'mongodb'
// Se a URI não estiver definida, lançamos um erro indicando que a variável de ambiente MONGODB_URI está ausente
if (!process.env.MONGO_URI || !process.env.MONGO_DATABASE) {
  throw new Error('Please add your Mongo URI and MONGO DATABASE to environment variables')
}

// A URI de conexão com o MongoDB, retirada das variáveis de ambiente
const uri = process.env.MONGO_URI + process.env.MONGO_DATABASE
// Opções adicionais para a conexão (pode ser vazio se não houver opções extras)
const options = {}

let client: MongoClient // Declaração da variável para armazenar o cliente MongoDB

// Verifica se estamos em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, armazenamos a conexão no objeto global para evitar reconexões após reinicializações
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options) // Cria um novo cliente MongoDB
    global._mongoClient.connect() // Conecta o cliente imediatamente
  }
  client = global._mongoClient // Reutiliza o cliente conectado
} else {
  // Em produção, criamos um novo cliente e conectamos
  client = new MongoClient(uri, options)
  client.connect() // Conecta o cliente imediatamente
}

// Exporta o cliente MongoDB conectado para ser usado em outras partes da aplicação
export { client }
