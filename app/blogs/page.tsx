import Link from 'next/link';
import Form from 'next/form';
import { getAllBlogs } from '@/app/services/blogs'

export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>
}) => {
  const params = await searchParams;
  const filter = (Array.isArray(params.filter) ? params.filter[0] : params.filter) ?? "";
  const term = filter.trim().toLowerCase();

  const blogs = await getAllBlogs();
  const visibleBlogs = [...blogs]
    .filter(blog => blog.title.toLowerCase().includes(term))
    .sort((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      <Form action="/blogs" className="mb-6 flex gap-2">
        <input
          name="filter"
          type="text"
          placeholder="Search by title"
          defaultValue={filter}
          className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-gray-900"
        />
        <button
          type="submit"
          className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </Form>

      {visibleBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul className="space-y-2">
          {visibleBlogs.map(blog => (
            <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
              <h3>
                <Link href={`/blogs/${blog.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {blog.title}
                </Link>
              </h3>
              <p>ID: {blog.id}</p>
              <p>by {blog.author}</p>
              <p>Url: {blog.url}</p>
              <p>likes: {blog.likes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Blogs