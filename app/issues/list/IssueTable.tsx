import React from "react"
import { Table } from "@radix-ui/themes"
import NextLink from "next/link"
import { IssueStatusBadge, Link } from "@/app/_components"
import { ArrowUpIcon } from "@radix-ui/react-icons"
import SortColumns from "./SortColumns"
import { Issue, Status } from "@prisma/client"

export interface SearchParams {
  status: Status
  orderBy: keyof Issue
  order: "asc" | "desc"
  page: string
}

interface Props {
  searchParams: SearchParams
  issues: Issue[]
}

interface Columns {
  label: string
  value: keyof Issue
  query: string
  className?: string
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
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
  )
}

const columns: Columns[] = [
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
export const columnNames = columns.map(({ value }) => value)

export default IssueTable
