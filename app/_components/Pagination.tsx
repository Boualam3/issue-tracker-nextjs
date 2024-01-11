"use client"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Button, Flex, Text } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize)
  const router = useRouter()
  const searchParams = useSearchParams()

  // if only one page we don't need to display the component
  if (pageCount <= 1) return null

  const changePageHandler = (page: number) => {
    // getting current query params
    const params = new URLSearchParams(searchParams)

    params.set("page", page.toString())
    router.push("?" + params.toString())
  }

  return (
    <Flex align="center" justify="center" gap="2">
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePageHandler(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePageHandler(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Text size="2">
        Page {currentPage} of {pageCount}{" "}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePageHandler(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePageHandler(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}

export default Pagination
