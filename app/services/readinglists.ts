import { and, asc, eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readinglists } from "../../db/schema"

export const getReadingList = async (userId: number) => {
  return db
    .select({
      id: readinglists.id,
      read: readinglists.read,
      blogId: blogs.id,
      title: blogs.title,
    })
    .from(readinglists)
    .innerJoin(blogs, eq(readinglists.blogId, blogs.id))
    .where(eq(readinglists.userId, userId))
    .orderBy(asc(readinglists.id))
}

export const isInReadingList = async (userId: number, blogId: number) => {
  const rows = await db
    .select({ id: readinglists.id })
    .from(readinglists)
    .where(and(eq(readinglists.userId, userId), eq(readinglists.blogId, blogId)))
    .limit(1)
  return rows.length > 0
}

export const addBlogToReadingList = async (userId: number, blogId: number) => {
  if (await isInReadingList(userId, blogId)) return
  await db.insert(readinglists).values({ userId, blogId }).onConflictDoNothing()
}

export const markReadingListItemAsRead = async (userId: number, itemId: number) => {
  await db
    .update(readinglists)
    .set({ read: true })
    .where(and(eq(readinglists.id, itemId), eq(readinglists.userId, userId)))
}