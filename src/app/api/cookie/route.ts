import { parse } from "cookie" // Importa a função 'parse' do pacote 'cookie', que é usada para analisar (parse) os cookies a partir de uma string.
import { NextRequest, NextResponse } from "next/server" // Importa os tipos 'NextRequest' e 'NextResponse' do Next.js, utilizados para lidar com requisições e respostas no lado do servidor.

export async function GET(request: NextRequest, response: NextResponse): Promise<NextResponse<Record<string, string | undefined>>> {
  // Define uma função assíncrona GET que responde a requisições GET. Recebe o objeto 'request' e 'response' e retorna uma Promise que resolve para um 'NextResponse'.

  const cookies = request.headers.get('cookie') // Obtém o cabeçalho 'cookie' da requisição. Isso traz todos os cookies como uma string.
  const data = cookies ? parse(cookies) : {} // Se os cookies existirem, usa 'parse' para convertê-los em um objeto. Caso contrário, define um objeto vazio.

  return NextResponse.json(data) // Retorna uma resposta JSON contendo os cookies (ou um objeto vazio, caso não haja cookies).
}
