import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";

export const instant = false

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const {id} = await params;
  const blog = getBlogById(Number(id));

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

export default BlogPage;