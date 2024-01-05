"use client"

import { User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import axios from "axios"
import { error } from "console"
import { useEffect, useState } from "react"

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    axios
      .get("/api/users")
      .then(({ data }) => setUsers(data))
      .catch((error) => console.log(error))
  }, [])
  return (
    <Select.Root>
      <Select.Trigger aria-placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
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
