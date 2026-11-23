import { NextResponse } from "next/server";
import { getUsers } from "@/app/services/users";

export async function GET() {
  return NextResponse.json({ message: "Hello from the me route!" });
}