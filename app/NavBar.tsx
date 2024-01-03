"use client"
import React from "react"

import { AiFillBug } from "react-icons/ai"

import Link from "next/link"

import { usePathname } from "next/navigation"

import classnames from "classnames"

import { useSession } from "next-auth/react"

import { Box, Flex, Container } from "@radix-ui/themes"
import { Spinner } from "./_components"

const NavBar = () => {
  const currentPathname = usePathname()
  const { status, data: session } = useSession()
  const links = [
    { href: "/issues/list", label: "Issues" },
    { href: "/dashboard", label: "Dashboard" },
  ]
  return (
    <div className="mb-5 px-5 py-3 shadow-sm">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classnames({
                      "text-zinc-900": link.href === currentPathname,
                      "text-zinc-500": link.href !== currentPathname,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Log out</Link>
            )}
            {status === "loading" && <Spinner />}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Log in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </div>
  )
}

export default NavBar
