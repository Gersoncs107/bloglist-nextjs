import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { addBlogLikes } from "@/app/actions/blogs";

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
      <form action={addBlogLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          Add Like
        </button>
      </form>
      <p>Url: {blog.url}</p>
    </div>
  );
};

export default BlogPage;