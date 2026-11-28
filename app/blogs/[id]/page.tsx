import Link from "next/link"
import { getCurrentUser } from "@/app/services/session"
import { isInReadingList } from "@/app/services/readinglists"
import { notFound } from "next/navigation"
import { getBlogById } from "@/app/services/blogs"
import { addBlogLikes, addToReadingList } from "@/app/actions/blogs"

export const instant = false

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const user = await getCurrentUser()
  const isOwner = user?.id === blog.userId
  const inReadingList = user ? await isInReadingList(user.id, blog.id) : false

  const isWebUrl = /^https?:\/\//i.test(blog.url)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href="/blogs" className="text-sm text-blue-600 hover:underline">
        ← Back to blogs
      </Link>

      <article className="mt-4 rounded-lg border border-gray-300 p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="mt-1 text-gray-500">by {blog.author}</p>

        <p className="mt-4 break-all">
          {isWebUrl ? (
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {blog.url}
            </a>
          ) : (
            blog.url
          )}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="text-lg font-semibold">
            {blog.likes} {blog.likes === 1 ? "like" : "likes"}
          </span>

          <form action={addBlogLikes}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add Like
            </button>
          </form>

          {user && !isOwner && !inReadingList && (
            <form action={addToReadingList}>
              <input type="hidden" name="id" value={blog.id} />
              <button
                type="submit"
                className="cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Add to Reading List
              </button>
            </form>
          )}

          {user && !isOwner && inReadingList && (
            <span className="text-sm text-gray-500">✓ In your reading list</span>
          )}
          </div>
         </article>
    </div>
  )
}
export default BlogPage