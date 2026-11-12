"use client";

import { useActionState } from "react";
import { createBlog } from "@/app/actions/blogs";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "" })

  return (
    <form action={formAction}>
      <div>
        <label>
          Title:
          <input
            id="title-input"
            name="title"
            type="text"
            placeholder="Enter blog title"
            required minLength={5}
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
            required minLength={5}
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
            required minLength={5}
          />
        </label>
      </div>

      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlog