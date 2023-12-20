import { Status } from "@prisma/client"
import { Badge } from "@radix-ui/themes"
import React from "react"

interface Props {
  status: Status
}

// The reason why we define this const `statusMapping` outside of the component is cuz we don't want to redefine each time rendering the component so it define one time and we use it in the component
const statusMapping: Record<
  Status, //this is the type of our keys
  { label: string; color: "red" | "violet" | "green" } //this is the type of our values for the keys
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMapping[status].color}>
      {statusMapping[status].label}
    </Badge>
  )
}

export default IssueStatusBadge
