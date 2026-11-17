"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    success: false,
  })

  const { showNotification } = useNotification()
  const router = useRouter()
  
  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!", "success")
      router.push("/blogs")
    }
  }, [state.success, showNotification, router])

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
            defaultValue={state.title}
            required
            minLength={5}
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
            defaultValue={state.author}
            required
            minLength={5}
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
            defaultValue={state.url}
            required
            minLength={5}
          />
        </label>
      </div>

      <button type="submit">Create</button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  )
}

export default NewBlog