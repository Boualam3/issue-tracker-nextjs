"use client"

import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Skeleton from "react-loading-skeleton"
import toast, { Toaster } from "react-hot-toast"

// ========================================
const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then(({ data }) => data),
    staleTime: 60 * 60 * 1000, //1hour
    retry: 3,
  })

  const assignIssueHandler = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId && userId !== "null" ? userId : null,
      })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Changes could not be saved.")
        }
        toast.success("Changes saved successfully")
      })
      .catch((error) => {
        toast.error("Changes could not be saved.")
        console.log(error)
      })
  }
  if (isLoading) return <Skeleton />
  if (error) return null

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.assignedToUserId || "null"}
        onValueChange={assignIssueHandler}
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
    </>
  )
}

export default AssigneeSelect
