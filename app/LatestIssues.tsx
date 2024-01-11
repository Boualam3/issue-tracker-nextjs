import prisma from "@/prisma/client"
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes"
import React from "react"
import { IssueStatusBadge } from "./_components"
import Link from "next/link"

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUse: true,
    },
  })

  return (
    <Card>
      <Heading mb="4" size="4">
        {" "}
        Latest Issues{" "}
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="1">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUserId && (
                    <Avatar
                      src={issue.assignedToUse?.image!}
                      fallback="?"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues
