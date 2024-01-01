import { notFound } from "next/navigation"
import React from "react"

import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import IssueFormSkeleton from "./loading"

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

type Props = {
  params: { id: string }
}
export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!issue) return notFound()
  return <IssueForm issue={issue} />
}
