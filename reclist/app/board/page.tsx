import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { recs } from "@/db/schema"
import { eq } from "drizzle-orm"
import RecApp from "@/components/RecApp"
import type { RecItem } from "@/lib/cats"

export default async function BoardPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const rows = await db.select().from(recs).where(eq(recs.userId, session.user.id!))

  const items: RecItem[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    details: r.details,
    recommendedBy: r.recommendedBy,
    notes: r.notes,
    status: r.status,
    createdAt: r.createdAt instanceof Date ? r.createdAt.getTime() : (r.createdAt ?? Date.now()),
  }))

  return (
    <RecApp
      initialRecs={items}
      user={{
        name: session.user.name ?? "You",
        email: session.user.email ?? "",
        image: session.user.image ?? null,
      }}
    />
  )
}
