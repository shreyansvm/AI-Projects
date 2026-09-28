import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/db"
import { recs } from "@/db/schema"
import { eq, and } from "drizzle-orm"

async function userId() {
  const session = await auth()
  return session?.user?.id ?? null
}

export async function GET() {
  const uid = await userId()
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const rows = await db.select().from(recs).where(eq(recs.userId, uid))
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const uid = await userId()
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const [row] = await db.insert(recs).values({
    userId: uid,
    title: body.title,
    category: body.category,
    details: body.details ?? null,
    recommendedBy: body.recommendedBy,
    notes: body.notes ?? null,
    status: "wishlist",
  }).returning()
  return NextResponse.json(row, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const uid = await userId()
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const { id, ...updates } = body
  const allowed = ["status", "notes"] as const
  const patch: Record<string, unknown> = {}
  for (const k of allowed) if (k in updates) patch[k] = updates[k]
  const [row] = await db.update(recs).set(patch)
    .where(and(eq(recs.id, id), eq(recs.userId, uid)))
    .returning()
  return NextResponse.json(row)
}

export async function DELETE(req: NextRequest) {
  const uid = await userId()
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await req.json()
  await db.delete(recs).where(and(eq(recs.id, id), eq(recs.userId, uid)))
  return NextResponse.json({ ok: true })
}
