import Image from "next/image"
import Pagination from "./_components/Pagination"
import LatestIssues from "./LatestIssues"
import IssueSummary from "./IssueSummary"
import prisma from "@/prisma/client"
import IssueChart from "./IssueChart"
import { Flex, Grid } from "@radix-ui/themes"

export default async function Home() {
  const openedIssue = await prisma.issue.count({ where: { status: "OPEN" } })

  const progressedIssue = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  })

  const closedIssue = await prisma.issue.count({ where: { status: "CLOSED" } })

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        {/* Refactoring the props uve passing and encapsulate it to object instead of 3props we'll pass 1props   */}
        <IssueSummary
          open={openedIssue}
          inProgress={progressedIssue}
          closed={closedIssue}
        />
        <IssueChart
          open={openedIssue}
          inProgress={progressedIssue}
          closed={closedIssue}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
