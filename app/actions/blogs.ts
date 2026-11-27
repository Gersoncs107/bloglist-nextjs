"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, addLikes, getBlogById  } from "../services/blogs"
import { getCurrentUser } from "../services/session"
import { addBlogToReadingList, markReadingListItemAsRead } from "../services/readinglists"
import { auth } from "@/auth"

export type CreateBlogState = {
  error: string
  success: boolean
  title: string
  author: string
  url: string
}

export const createBlog = async (
  prevState: CreateBlogState,
  formData: FormData,
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
    return { ...values, success: false, error: "Title must be at least 5 characters long." }
  }
  if (author.length < 5) {
    return { ...values, success: false, error: "Author must be at least 5 characters long." }
  }
  if (url.length < 5) {
    return { ...values, success: false, error: "URL must be at least 5 characters long." }
  }

  await addBlog({ title, author, url, likes: 0 })

  revalidatePath("/blogs")
  return { ...values, success: true, error: "" }
}

export const addBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addLikes(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const addToReadingList = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("id"))
  if (!Number.isInteger(blogId)) return

  const blog = await getBlogById(blogId)
  if (!blog) return

  await addBlogToReadingList(user.id, blogId)

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

export const markAsRead = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const itemId = Number(formData.get("id"))
  if (!Number.isInteger(itemId)) return

  await markReadingListItemAsRead(user.id, itemId)

  revalidatePath("/me")
}