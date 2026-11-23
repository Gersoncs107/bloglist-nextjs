"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">

       <NavLink href="/blogs">home</NavLink>
          {" | "}
          <NavLink href="/blogs">blogs</NavLink>
          {" | "}
          <NavLink href="/users">users</NavLink>
          {" | "}
      {session ? (
        <>
          <NavLink href="/blogs/new">create new</NavLink>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <>
          <NavLink href="/login">login</NavLink>
          {" | "}
          <NavLink href="/register">register</NavLink>
        </>
      )}
    </nav>
  )
}