import prisma from "@/prisma/client"
import { Issue } from "@prisma/client"
import { Table } from "@radix-ui/themes"

import { IssueStatusBadge, Link } from "@/app/_components"
import delay from "delay"
import IssueActions from "./IssueActions"
// import axios from "axios"

const IssuesPage = async () => {
  let issues: Issue[] = await prisma.issue.findMany()
  await delay(2000)
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues?.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = "force-dynamic"

// we telling nextjs the output of this page has to be revalidate every 0s of time (all the time)
// export const revalidate = 0

export default IssuesPage
