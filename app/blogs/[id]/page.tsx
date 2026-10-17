import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const blogId = parseInt(params.id, 10);
  const blog = getBlogById(blogId);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>Likes: {blog.likes}</p>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};