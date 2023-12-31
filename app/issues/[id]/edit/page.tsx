import { notFound } from "next/navigation"
import React from "react"
import IssueForm from "../../_components/IssueForm"

type Props = {
  params: { id: string }
}
export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!issue) return notFound()
  return <IssueForm issue={issue} />
}
