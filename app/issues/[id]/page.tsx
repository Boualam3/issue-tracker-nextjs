import prisma from "@/prisma/client"
import delay from "delay"
import { notFound } from "next/navigation"
import React from "react"

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issueId = parseInt(params.id)
  if (!issueId) notFound()
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  })
  if (!issue) notFound()
  await delay(2000)
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage
