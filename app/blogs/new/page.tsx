import { createBlog } from "@/app/actions/blogs";


const NewBlog = () => {
  
  return (
    <form action={createBlog}>
      <div>
        <label>
          Title:
          <input
            id='title-input'
            type="text"
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
            placeholder="https://example.com"
          />
        </label>
      </div>

      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlog