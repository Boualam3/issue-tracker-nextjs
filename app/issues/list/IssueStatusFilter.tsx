"use client"
import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
Status
import React, { useEffect, useState } from "react"
import { set } from "zod"

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
]

const IssueStatusFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <Select.Root
      defaultValue="undefined"
      onValueChange={(status: string) => {
        const params = new URLSearchParams()
        if (status) params.append("status", status)

        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!)
        if (searchParams.get("order"))
          params.append("order", searchParams.get("order")!)

        const Query = params.size ? "?" + params.toString() : ""

        // console.log(url)
        router.push("/issues/list" + Query)
        router.refresh()
      }}
    >
      <Select.Trigger />

      <Select.Content>
        {statuses.map((item, idx) => (
          <Select.Item key={idx} value={item.value || "undefined"}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
