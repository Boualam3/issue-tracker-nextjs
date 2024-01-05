import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany()
  if (!users) return NextResponse.json([], { status: 400 })
  return NextResponse.json(users, { status: 200 })
}
