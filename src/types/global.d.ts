declare global {
  var _mongoClient: MongoClient | undefined
}

export { }

import { NextRequest } from 'next/server'

declare module 'next/server' {
  export interface NextRequest {
    user: { email: string }
  }
}

