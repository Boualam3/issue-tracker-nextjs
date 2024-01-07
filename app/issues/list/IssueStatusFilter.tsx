"use client"
import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
Status
import React from "react"

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
]

const IssueStatusFilter = () => {
  return (
    <Select.Root defaultValue="undefined">
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
