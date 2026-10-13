"use server"

import { redirect } from "next/navigation";
import { addBlog } from "../services/blogs";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title")?.toString() || "";
  const author = formData.get("author")?.toString() || "";
  const url = formData.get("url")?.toString() || "";

  await addBlog({
      title, author, url,
      likes: 0
  });
  redirect("/blogs");
}