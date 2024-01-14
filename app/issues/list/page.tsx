import prisma from "@/prisma/client"
import { Issue, Status } from "@prisma/client"
import delay from "delay"
import IssueActions from "./IssueActions"
import Pagination from "@/app/_components/Pagination"
import IssueTable, { SearchParams, columnNames } from "./IssueTable"
import { Flex } from "@radix-ui/themes"
import { Metadata } from "next"

type Props = {
  searchParams: SearchParams
}

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined
  const where = { status: status }
  // we need this logic when we use both sort orders in SortColumns client side component
  const order = ["asc", "desc"].includes(searchParams.order)
    ? searchParams.order
    : "asc" // default order
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: order }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  let issues: Issue[] = await prisma.issue.findMany({
    // filtering
    where,
    // sorting
    orderBy,
    // paginate
    skip: (page - 1) * pageSize,
    take: pageSize,
  })
  const issueCount = await prisma.issue.count({ where })
  // await delay(2000) simulate slow back-end process
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  )
}

export const dynamic = "force-dynamic"

// we telling nextjs the output of this page has to be revalidate every 0s of time (all the time)
// export const revalidate = 0

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: " View  all  project issues",
}

export default IssuesPage
