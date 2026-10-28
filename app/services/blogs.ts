import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"


export const getAllBlogs = () => {
  return blogs;
}

export const addBlog = (blog: { title: string; author: string; url: string; likes: number }) => {
  blogs.push({ ...blog, id: nextId++ });
}

export const getBlogById = (id: number) => {
  return blogs.find(blog => blog.id === id);
}

export const addLikes = (id: number) => {
  const blog = blogs.find(blog => blog.id === id);
  if (blog) {
    blog.likes += 1;
  }
}