"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">

       <NavLink href="/blogs" className="hover:text-gray-300">home</NavLink>
          {" | "}
          <NavLink href="/blogs" className="hover:text-gray-300">blogs</NavLink>
          {" | "}
          <NavLink href="/users" className="hover:text-gray-300">users</NavLink>
          {" | "}
      {session ? (
        <>
          <NavLink href="/blogs/new" className="hover:text-gray-300">create new</NavLink>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()} className="hover:text-gray-300">logout</button>
        </>
      ) : (
        <>
          <NavLink href="/login" className="hover:text-gray-300">login</NavLink>
          {" | "}
          <NavLink href="/register" className="hover:text-gray-300">register</NavLink>
        </>
      )}
    </nav>
  )
}