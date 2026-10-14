import { createBlog } from "@/app/actions/blogs";

const NewBlog = () => {
  return (
    <form action={createBlog}>
      <div>
        <label>
          Title:
          <input
            id="title-input"
            name="title"
            type="text"
            placeholder="Enter blog title"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Author:
          <input
            id="author-input"
            name="author"
            type="text"
            placeholder="Enter author name"
            required
          />
        </label>
      </div>

      <div>
        <label>
          URL:
          <input
            id="url-input"
            name="url"
            type="url"
            placeholder="https://example.com"
            required
          />
        </label>
      </div>

      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlog