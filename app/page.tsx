import { useState } from 'react'

type BlogData = {
  id: string
  likes: number
  author: string
  title: string
  url: string
  user?: string | { id?: string; _id?: string; username?: string; name?: string } | null
}

type BlogProps = {
  blog: BlogData
  updateBlog: (id: string, blog: Omit<BlogData, 'id'>) => Promise<BlogData>
  deleteBlog: (id: string) => Promise<void>
  user?: { username?: string } | null
}

const Blog = ({ blog, updateBlog, deleteBlog, user }: BlogProps) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => setVisible(!visible)

  const canRemove = typeof blog.user === 'object' && blog.user !== null &&
    !!user && blog.user.username === user.username

  const handleLike = async () => {
    const userId = blog.user && typeof blog.user === 'object'
      ? blog.user.id || blog.user._id
      : blog.user

    const updatedBlog = {
      user: userId,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const response = await updateBlog(blog.id, updatedBlog)
    setLikes(response.likes)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id)
    }
  }

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '10px'
  }

  return (
    <div className="blog">
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>{blog.title}</strong> by <em>{blog.author}</em>
        </div>
        <button id="view-button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div style={{ marginTop: '10px', paddingLeft: '10px' }}>
          <div><span style={labelStyle}>URL:</span> <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
          <div style={{ marginTop: '8px' }}>
            <span style={labelStyle}>Likes:</span> {likes}
            <button id="like-button" style={{ marginLeft: '10px' }} onClick={handleLike}>like</button>
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={labelStyle}>Added by:</span> {typeof blog.user === 'object' && blog.user !== null ? blog.user.name || 'unknown' : 'unknown'}
          </div>
          {canRemove && (
            <div style={{ marginTop: '12px' }}>
              <button id="remove-button" style={{ backgroundColor: '#d9534f', color: 'white' }} onClick={handleRemove}>
                Remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog