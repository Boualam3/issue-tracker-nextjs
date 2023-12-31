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
}
