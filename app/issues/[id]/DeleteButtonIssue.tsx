"use client"
import { Spinner } from "@/app/_components"
import { TrashIcon } from "@radix-ui/react-icons"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios"

import { useRouter } from "next/navigation"

import React, { useState } from "react"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false)
  const [isDeleting, setDeleting] = useState(false)
  const router = useRouter()

  const deleteIssueHandler = async () => {
    try {
      setDeleting(true)
      const res = await axios.delete(`/api/issues/${issueId}`, {
        data: {
          id: issueId,
        },
      })

      if (res.status === 200) {
        setDeleting(false)
      } else {
        setError(true)
        setDeleting(false)
      }

      router.push("/issues/list")
      // issues get cached by nextjs so here we refresh for refresh issues data
      router.refresh()
      console.log("response: ", res)
    } catch (error) {
      setError(true)
      console.log(error)
      setDeleting(false)
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            <TrashIcon />
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue ? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" justify="between">
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssueHandler}>
                Confirm
              </Button>
            </AlertDialog.Action>

            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted. Try again
          </AlertDialog.Description>

          <Button
            onClick={() => setError(false)}
            color="gray"
            variant="soft"
            mt="2"
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton
