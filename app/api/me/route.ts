import { NextResponse } from "next/server"
import { getUserByToken } from "@/app/services/users"

const unauthorized = () =>
  NextResponse.json(
    { error: "Invalid or missing token" },
    { status: 401, headers: { "WWW-Authenticate": "Bearer" } },
  )

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization")
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim()

  if (!token) {
    return unauthorized()
  }

  const user = await getUserByToken(token)

  if (!user) {
    return unauthorized()
  }

  const { blogs, ...profile } = user

  return NextResponse.json({ ...profile, createdBlogs: blogs })
}