import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../../services/users"

export const instant = false

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

    return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-500">Username: {user.username}</p>

      <h3 className="mb-2 mt-6 text-lg font-semibold">Blogs added</h3>
      {user.blogs.length === 0 ? (
        <p className="text-gray-500">No blogs yet.</p>
      ) : (
        <ul className="space-y-2">
          {user.blogs.map((blog) => (
            <li key={blog.id} className="rounded border border-gray-300 p-3 hover:shadow-md">
              <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserPage