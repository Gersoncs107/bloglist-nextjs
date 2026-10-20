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

  const blogs = getAllBlogs();
  const visibleBlogs = [...blogs]
    .filter(blog => blog.title.toLowerCase().includes(term))
    .sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>

      <Form action="/blogs">
        <input
          name="filter"
          type="text"
          placeholder="Search by title"
          defaultValue={filter}
        />
        <button type="submit">Search</button>
      </Form>

      {visibleBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul>
          {visibleBlogs.map(blog => (
            <li key={blog.id}>
              <h3>
                <Link href={`/blogs/${blog.id}`}>
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