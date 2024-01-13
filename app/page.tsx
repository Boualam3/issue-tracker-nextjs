import Image from "next/image"
import Pagination from "./_components/Pagination"
import LatestIssues from "./LatestIssues"
import IssueSummary from "./IssueSummary"
import prisma from "@/prisma/client"
export default async function Home() {
  const openedIssue = await prisma.issue.count({ where: { status: "OPEN" } })
  const progressedIssue = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  })
  const closedIssue = await prisma.issue.count({ where: { status: "CLOSED" } })
  return (
    <IssueSummary
      open={openedIssue}
      inProgress={progressedIssue}
      closed={closedIssue}
    />
  )
}
