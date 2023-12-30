import prisma from "@/prisma/client"
import { Box, Grid } from "@radix-ui/themes"
import delay from "delay"
import { notFound } from "next/navigation"

import EditIssueButton from "./EditIssueButton"
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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issueId} />
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
