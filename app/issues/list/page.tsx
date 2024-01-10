import prisma from "@/prisma/client"
import { Issue, Status } from "@prisma/client"
import { Table } from "@radix-ui/themes"
import NextLink from "next/link"
import { IssueStatusBadge, Link } from "@/app/_components"
import delay from "delay"
import IssueActions from "./IssueActions"
import { ArrowUpIcon } from "@radix-ui/react-icons"
import SortColumns from "./SortColumns"
// import axios from "axios"
type Props = {
  searchParams: { status: Status; orderBy: keyof Issue; order: "asc" | "desc" }
}

const columns: {
  label: string
  value: keyof Issue
  query: string
  className?: string
}[] = [
  { label: "Issue", value: "title", query: "orderBy" },
  {
    label: "Status",
    value: "status",
    query: "orderBy",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    query: "orderBy",
    className: "hidden md:table-cell",
  },
]

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const orderByKey = columns
    .map(({ value }) => value)
    .includes(searchParams.orderBy)
    ? searchParams.orderBy
    : undefined
  // we need this logic when we use both sort orders in SortColumns client side component
  const order = ["asc", "desc"].includes(searchParams.order)
    ? searchParams.order
    : undefined
  // console.log(
  //   "current order : ",
  //   orderByKey ? { [orderByKey]: order || "asc" } : {}
  // )
  let issues: Issue[] = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderByKey ? { [orderByKey]: order } : {},
  })

  // await delay(2000)
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                  className="space-x-1"
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
                {/* This make sort for both orders
                <SortColumns column={column} searchParams={searchParams} /> */}
              </Table.ColumnHeaderCell>
            ))}
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
