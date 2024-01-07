"use client"

import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Skeleton from "react-loading-skeleton"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then(({ data }) => data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  })
  if (isLoading) return <Skeleton />
  if (error) return null
  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "null"}
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId && userId !== "null" ? userId : null,
        })
      }}
    >
      <Select.Trigger aria-placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="null">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
