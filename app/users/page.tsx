import Link from "next/link"
import { getUsers } from "../services/users"

export const instant = false

const Users = async () => {
  const users = await getUsers()

    return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="mb-4 text-2xl font-bold">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="rounded border border-gray-300 p-3 hover:shadow-md">
            <Link href={`/users/${user.username}`} className="text-blue-600 hover:underline">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users