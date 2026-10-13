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

const Blogs = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
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