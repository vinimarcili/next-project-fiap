import { parse } from "cookie"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, response: NextResponse): Promise<NextResponse<Record<string, string | undefined>>> {
  const cookies = request.headers.get('cookie')
  const data = cookies ? parse(cookies) : {}
  return NextResponse.json(data)
}
