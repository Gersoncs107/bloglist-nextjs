import { eq, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"
import { getCurrentUser } from "./session"
import { addBlogToReadingList } from "./readinglists"


export const getAllBlogs = async () => {
  return await db.query.blogs.findMany()
}

export const addBlog = async (blog: { title: string; author: string; url: string; likes: number }) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const [created] = await db
    .insert(blogs)
    .values({ ...blog, userId: user.id })
    .returning({ id: blogs.id })

  await addBlogToReadingList(user.id, created.id)
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
