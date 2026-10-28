import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

const blogs = [
  {
    id: 1,
    title: "React Patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    id: 2,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    id: 3,
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  }
];

let nextId = 4;

export const getAllBlogs = () => {
  return blogs;
}

export const addBlog = (blog: { title: string; author: string; url: string; likes: number }) => {
  blogs.push({ ...blog, id: nextId++ });
}

export const getBlogById = (id: number) => {
  return blogs.find(blog => blog.id === id);
}

export const addLikes = (id: number) => {
  const blog = blogs.find(blog => blog.id === id);
  if (blog) {
    blog.likes += 1;
  }
}