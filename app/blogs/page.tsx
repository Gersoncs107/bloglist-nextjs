import Link from 'next/link';
import {getAllBlogs} from '@/app/services/blogs'

const Blogs = () => {
  const blogs = getAllBlogs();
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
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
    </div>
  )
}
export default Blogs