import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"


export const getAllBlogs = async () => {
  return await db.query.blogs.findMany()
}

export const addBlog = async (blog: { title: string; author: string; url: string; likes: number }) => {
  await db.insert(blogs).values({ ...blog, id: Math.floor(Math.random() * 1000000) });
}

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({ where: eq(blogs.id, id) });
}

export const addLikes = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    await db.update(blogs).set({ likes: blog.likes + 1 }).where(eq(blogs.id, id));
  }
  }
}