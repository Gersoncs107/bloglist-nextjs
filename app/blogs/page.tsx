import Link from 'next/link';
import {getAllBlogs} from '@/app/services/blogs'

const Blogs = () => {
  const blogs = getAllBlogs();

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
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