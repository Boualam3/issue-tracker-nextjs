"use client"

import { Issue, Status } from "@prisma/client"
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"



const SortColumns = ({
  column,
  searchParams,
}: {
  column: {
    label: string
    value: string
    query: string
    className?: string
  }
  searchParams: { status: Status; orderBy: keyof Issue }
}) => {
  // true => descending
  // false =>  ascending
  const [order, setOrder] = useState(false)

  const router = useRouter()

  return (
    <>
      {/*indicate desc */}
      {column.value === searchParams.orderBy && !order && (
        <ArrowDownIcon className="inline" />
      )}
      <Link
        href={{
          query: {
            ...searchParams,
            orderBy: column.value,
            order: order ? "desc" : "asc",
          },
        }}
        onClick={(e) => {
          setOrder((prev) => !prev)
          router.refresh()
        }}
        className="space-x-1"
      >
        {column.label}
      </Link>
      {/*indicate asc order*/}
      {column.value === searchParams.orderBy && order && (
        <ArrowUpIcon className="inline" />
      )}
    </>
  )
}

export default SortColumns
