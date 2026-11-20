"use client"

import Link from "next/link"
import { registerUser } from "../actions/users"
import { useActionState } from "react"

const labelClass = "block text-sm font-medium"
const inputClass =
  "mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, { error: "" })

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="mb-4 text-2xl font-bold">Register</h2>

      <form action={formAction} className="space-y-4">
        <label className={labelClass}>
          Username
          <input type="text" name="username" required minLength={4} className={inputClass} />
        </label>

        <label className={labelClass}>
          Name
          <input type="text" name="name" required minLength={4} className={inputClass} />
        </label>

        <label className={labelClass}>
          Password
          <input type="password" name="password" required minLength={4} className={inputClass} />
        </label>

        <label className={labelClass}>
          Password Confirm
          <input type="password" name="passwordConfirm" required minLength={4} className={inputClass} />
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
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}