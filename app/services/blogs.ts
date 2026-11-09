import { eq, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"
import { getCurrentUser } from "./session"


export const getAllBlogs = async () => {
  return await db.query.blogs.findMany()
}

export const addBlog = async (blog: { title: string; author: string; url: string; likes: number }) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })

  if (!user) {
    throw new Error("Cannot add a blog without an existing user")
  }

  await db.insert(blogs).values({ ...blog, userId: user.id });
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
