"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";

const labelClass = "block text-sm font-medium"
const inputClass =
  "mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"

const NewBlog = () => {
  const [state, formAction, isPending] = useActionState(createBlog, {
    error: "",
    success: false,
    title: "",
    author: "",
    url: "",
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
    <div className="max-w-md mx-auto p-6">
      <h2 className="mb-4 text-2xl font-bold">Create new blog</h2>

      <form action={formAction} className="space-y-4">
        <label className={labelClass}>
          Title
          <input
            id="title-input"
            name="title"
            type="text"
            placeholder="Enter blog title"
            defaultValue={state.title}
            required
            minLength={5}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          Author
          <input
            id="author-input"
            name="author"
            type="text"
            placeholder="Enter author name"
            defaultValue={state.author}
            required
            minLength={5}
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          URL
          <input
            id="url-input"
            name="url"
            type="url"
            placeholder="https://example.com"
            defaultValue={state.url}
            required
            minLength={5}
            className={inputClass}
          />
        </label>

        {state.error && (
          <p role="alert" className="text-sm text-red-600">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  )
}

export default NewBlog