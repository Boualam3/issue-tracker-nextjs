import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import prisma from "@/prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import delay from "delay"
import { notFound } from "next/navigation"
import React from "react"
import ReactMarkdown from "react-markdown"

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
      <Heading>{issue.title}</Heading>
      <Flex gap={"3"} my={"2"}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose lg:prose-xl" mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  )
}

export default IssueDetailPage
