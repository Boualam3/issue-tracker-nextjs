import prisma from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import delay from "delay"
import { notFound } from "next/navigation"

import EditIssueButton from "./EditIssueButton"
import DeleteIssueButton from "./DeleteButtonIssue"
import IssueDetails from "./IssueDetails"

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issueId = parseInt(params.id)
  if (!issueId) notFound()

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  })

  if (!issue) notFound()
  // The delay allow us to simulate slow connection for showing up te loading component
  await delay(2000)
  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex className="flex-col md:justify-between md:flex-row lg:flex-col gap-3">
          <EditIssueButton issueId={issueId} />
          <DeleteIssueButton issueId={issueId} />
        </Flex>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
