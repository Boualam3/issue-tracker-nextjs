"use client"
import React from "react"

import { AiFillBug } from "react-icons/ai"

import Link from "next/link"

import { usePathname } from "next/navigation"

import classnames from "classnames"

import { useSession } from "next-auth/react"

import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from "@radix-ui/themes"
import { Skeleton, Spinner } from "./_components"

const NavBar = () => {
  return (
    <div className="mb-5 px-5 py-3 shadow-sm">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          {/*  */}
          <AuthStatus />
        </Flex>
      </Container>
    </div>
  )
}

function NavLinks() {
  const currentPathname = usePathname()

  const links = [
    { href: "/issues/list", label: "Issues" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPathname,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function AuthStatus() {
  const { status, data: session } = useSession()
  if (status === "loading") return <Skeleton width="3rem" />
  if (status === "authenticated") {
    return (
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Text size="2">
                <Link className="nav-link" href="/api/auth/signout">
                  Log out
                </Link>
              </Text>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    )
  }

  if (status === "unauthenticated") {
    return (
      <Box>
        <Link href="/api/auth/signin">Log in</Link>
      </Box>
    )
  }
}

export default NavBar
