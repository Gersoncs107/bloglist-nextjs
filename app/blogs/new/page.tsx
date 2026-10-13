import { title } from "process"


const BlogForm = () => {
  
  return (
    <form>
      <div>
        <label>
          Title:
          <input
            id='title-input'
            type="text"
            value={title}
            placeholder="Enter blog title"
          />
        </label>
      </div>

      <div>
        <label>
          Author:
          <input
            id='author-input'
            type="text"
            defaultValue=""
            placeholder="Enter author name"
          />
        </label>
      </div>

      <div>
        <label>
          URL:
          <input
            id='url-input'
            type="url"
            defaultValue=""
            placeholder="https://example.com"
          />
        </label>
      </div>

      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm