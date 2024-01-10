import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Button, Flex, Text } from "@radix-ui/themes"
import React from "react"

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize)
  // if only one page we don't need to display the component
  if (pageCount <= 1) return null
  return (
    <Flex align="center" gap="2">
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {pageCount}{" "}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === pageSize}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}

export default Pagination
