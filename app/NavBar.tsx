"use client"
import React from "react"

import { AiFillBug } from "react-icons/ai"
import Link from "next/link"
import { usePathname } from "next/navigation"
import classnames from "classnames"

const NavBar = () => {
  const currentPathname = usePathname()
  const links = [
    { href: "/issues/list", label: "Issues" },
    { href: "/dashboard", label: "Dashboard" },
  ]
  return (
    <div className="flex space-x-6 mb-5 px-5 items-center h-14 bg-slate-200 shadow-sm">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classnames({
              "text-zinc-900": link.href === currentPathname,
              "text-zinc-500": link.href !== currentPathname,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default NavBar
