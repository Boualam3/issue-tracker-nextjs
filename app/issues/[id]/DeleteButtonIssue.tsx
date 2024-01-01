"use client"
import { TrashIcon } from "@radix-ui/react-icons"
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios"

import React from "react"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const deleteIssueHandler = async () => {
    try {
      const res = await axios.delete(`/api/issues/${issueId}`, {
        data: {
          id: issueId,
        },
      })
      console.log("response: ", res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <TrashIcon />
            Delete Issue
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
    </>
  )
}

export default DeleteIssueButton
