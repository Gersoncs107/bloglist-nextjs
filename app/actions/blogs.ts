"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, addLikes } from "../services/blogs";
import { auth } from "@/auth";

export type CreateBlogState = {
  error: string
  title: string
  author: string
  url: string
}

export const createBlog = async (
  prevState: CreateBlogState,
  formData: FormData
): Promise<CreateBlogState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string) ?? ""
  const author = (formData.get("author") as string) ?? ""
  const url = (formData.get("url") as string) ?? ""
  const values = { title, author, url }

  if (title.length < 5) {
    return { ...values, error: "Title must be at least 5 characters long." }
  }
  if (author.length < 5) {
    return { ...values, error: "Author must be at least 5 characters long." }
  }
  if (url.length < 5) {
    return { ...values, error: "URL must be at least 5 characters long." }
  }

  await addBlog({ title, author, url, likes: 0 })

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const addBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addLikes(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}