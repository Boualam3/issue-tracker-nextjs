import { issueSchema } from "@/app/validationSchemas"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const validations = issueSchema.safeParse(body)
  if (!validations.success)
    return NextResponse.json(validations.error.format(), { status: 400 })

  const issue = await prisma?.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!issue)
    return NextResponse.json({ error: "Invalid identifier" }, { status: 404 })

  await prisma?.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  })
  return NextResponse.json({ status: 200 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issueID = parseInt(params.id)
  if (!issueID)
    return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 })
  const issue = await prisma?.issue.findUnique({ where: { id: issueID } })
  if (!issue)
    return NextResponse.json(
      { error: "No Issue with given ID" },
      { status: 404 }
    )
  await prisma?.issue.delete({ where: { id: issueID } })
  return NextResponse.json({ status: 200 })
}
