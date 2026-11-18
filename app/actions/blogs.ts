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
  prevState: { error: string; success?: boolean },
  formData: FormData
)=> {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string) ?? ""
  const author = (formData.get("author") as string) ?? ""
  const url = (formData.get("url") as string) ?? ""
  const values = { title, author, url }

  if (!title || title.length < 5) {
    return { 
      error: "Title must be at least 5 characters long.",
      success: false
    }
  }
  if (!author || author.length < 5) {
    return { 
      error: "Author must be at least 5 characters long.", 
      success: false }
  }
  if (!url || url.length < 5) {
    return { 
      error: "URL must be at least 5 characters long.", 
      success: false }
  }

  await addBlog({ title, author, url, likes: 0 })

  revalidatePath("/blogs")
  return { error: "", success: true }
}

export const addBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addLikes(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}