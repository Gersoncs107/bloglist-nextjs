"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, addLikes } from "../services/blogs";
import { auth } from "@/auth";

export const createBlog = async (
  prevState: {error: string},
  formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  await addBlog({ title, author, url, likes: 0 });

  revalidatePath("/blogs");
  redirect("/blogs");
}

export const addBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addLikes(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}