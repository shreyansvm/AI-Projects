"use client"

import { useState, useCallback } from "react"
import type { RecItem } from "@/lib/cats"
import RecBoard from "./RecBoard"
import RecShelf from "./RecShelf"
import ViewSwitcher from "./ViewSwitcher"

type View = "board" | "shelf"

type User = { name: string; email: string; image: string | null }

export default function RecApp({ initialRecs, user }: { initialRecs: RecItem[]; user: User }) {
  const [view, setView] = useState<View>("board")
  const [recs, setRecs] = useState<RecItem[]>(initialRecs)

  const addRec = useCallback(async (form: {
    title: string; category: string; details: string; recommendedBy: string; notes: string
  }) => {
    const optimistic: RecItem = {
      id: `tmp-${Date.now()}`,
      title: form.title,
      category: form.category,
      details: form.details || null,
      recommendedBy: form.recommendedBy,
      notes: form.notes || null,
      status: "wishlist",
      createdAt: Date.now(),
    }
    setRecs((prev) => [optimistic, ...prev])
    try {
      const res = await fetch("/api/recs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const saved = await res.json()
      setRecs((prev) => prev.map((r) => (r.id === optimistic.id ? saved : r)))
    } catch {
      setRecs((prev) => prev.filter((r) => r.id !== optimistic.id))
    }
  }, [])

  const updateRec = useCallback(async (id: string, patch: Partial<RecItem>) => {
    setRecs((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
    await fetch("/api/recs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    })
  }, [])

  const deleteRec = useCallback(async (id: string) => {
    setRecs((prev) => prev.filter((r) => r.id !== id))
    await fetch("/api/recs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
  }, [])

  const props = { recs, user, onAdd: addRec, onUpdate: updateRec, onDelete: deleteRec }

  return (
    <>
      {view === "board" ? <RecBoard {...props} /> : <RecShelf {...props} />}
      <ViewSwitcher view={view} onSwitch={setView} />
    </>
  )
}
