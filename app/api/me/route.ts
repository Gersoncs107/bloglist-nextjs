import { NextResponse } from "next/server";
import { getUsersWithBlogs } from "@/app/services/users";

export async function GET() {
  const users = await getUsersWithBlogs();
  return NextResponse.json({ users });
}