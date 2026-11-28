import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { getReadingList } from "../services/readinglists"
import { generateToken } from "../actions/users"
import { markAsRead } from "../actions/blogs"

export const instant = false

const MePage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingList(user.id)
  const unread = readingList.filter((item) => !item.read)
  const read = readingList.filter((item) => item.read)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-gray-900 shadow-sm">
        <h2 className="text-3xl font-bold">My Profile</h2>

        <p className="mt-6">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="mt-3">
          <span className="font-semibold">Username:</span> {user.username}
        </p>

        <hr className="my-8 border-gray-300" />

        <h3 className="text-2xl font-bold">Reading List</h3>

        <h4 className="mb-3 mt-6 text-xl font-semibold">Unread ({unread.length})</h4>
        {unread.length === 0 ? (
          <p className="text-gray-600">No unread blogs.</p>
        ) : (
          <ul className="space-y-3">
            {unread.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 rounded bg-yellow-50 p-4"
              >
                <Link
                  href={`/blogs/${item.blogId}`}
                  className="text-lg text-blue-600 hover:underline"
                >
                  {item.title}
                </Link>
                <form action={markAsRead}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    className="cursor-pointer whitespace-nowrap rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        <h4 className="mb-3 mt-8 text-xl font-semibold">Read ({read.length})</h4>
        {read.length === 0 ? (
          <p className="text-gray-600">No blogs read yet.</p>
        ) : (
          <ul className="space-y-3">
            {read.map((item) => (
              <li key={item.id} className="rounded bg-green-50 p-4">
                <Link
                  href={`/blogs/${item.blogId}`}
                  className="text-lg text-blue-600 hover:underline"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <hr className="my-8 border-gray-300" />

        <h3 className="text-2xl font-bold">API Token</h3>

        <div className="mt-4 rounded bg-gray-50 p-4">
          {user.token ? (
            <>
              <p className="text-sm text-gray-600">Current token:</p>
              <code className="mt-2 block break-all rounded bg-gray-100 px-3 py-2 text-gray-900">
                {user.token}
              </code>
            </>
          ) : (
            <p className="text-gray-600">No token has been generated yet.</p>
          )}
        </div>

        <form action={generateToken} className="mt-6">
          <button
            type="submit"
            className="cursor-pointer rounded bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  )
}

export default MePage 