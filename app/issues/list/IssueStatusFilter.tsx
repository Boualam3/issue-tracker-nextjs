"use client"
import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
Status
import React from "react"

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
]

const IssueStatusFilter = () => {
  const router = useRouter()
  return (
    <Select.Root
      defaultValue="undefined"
      onValueChange={(status: string) => {
        const validStatus: Status | "undefined" =
          status &&
          (Object.values(Status) as Status[]).includes(status as Status)
            ? (status as Status)
            : "undefined"

        const urlWithQuery =
          validStatus !== "undefined"
            ? `/issues/list?status=${validStatus}`
            : "/issues/list"
        // console.log(url)
        router.push(urlWithQuery)
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
