"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"
import { revalidatePath } from "next/cache"
import { randomUUID } from "node:crypto"
import { getCurrentUser } from "../services/session"

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  await db
    .update(users)
    .set({ token: randomUUID() })
    .where(eq(users.id, user.id))

  revalidatePath("/me")
}

export const registerUser = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  if (!username || username.length < 4) {
    return { error: "Username must be at least 4 characters long" }
  }

  if (!password || password.length < 4) {
    return { error: "Password must be at least 4 characters long" }
  }

  if (password !== passwordConfirm) {
    return { error: "Passwords do not match" }
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1)

  if (existingUser) {
    return { error: "Username already exists" }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}