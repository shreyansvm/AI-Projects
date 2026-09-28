"use client"

import { useState, useMemo } from "react"
import { CATS, getCat } from "@/lib/cats"
import type { RecItem } from "@/lib/cats"
import RecCard from "./RecCard"
import AddPanel from "./AddPanel"
import UserMenu from "./UserMenu"

type Props = {
  recs: RecItem[]
  user: { name: string; email: string; image: string | null }
  onAdd: (form: { title: string; category: string; details: string; recommendedBy: string; notes: string }) => void
  onUpdate: (id: string, patch: Partial<RecItem>) => void
  onDelete: (id: string) => void
}

export default function RecBoard({ recs, user, onAdd, onUpdate, onDelete }: Props) {
  const [filter, setFilter] = useState("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [doneOpen, setDoneOpen] = useState(false)

  const open = recs.filter((r) => r.status === "wishlist")
  const done = recs.filter((r) => r.status === "done")

  const visibleCats = filter === "all" ? CATS : CATS.filter((c) => c.key === filter)
  const sections = visibleCats
    .map((c) => ({ ...c, items: open.filter((r) => r.category === c.key) }))
    .filter((s) => s.items.length > 0)

  const people = useMemo(() => Array.from(new Set(recs.map((r) => r.recommendedBy))).slice(0, 8), [recs])

  const gridCols = filter === "all" ? "repeat(auto-fill, minmax(232px, 1fr))" : "repeat(auto-fill, minmax(400px, 1fr))"

  const defaultCat = filter === "all" ? "movies" : filter

  return (
    <div style={{ minHeight: "100vh", background: "#F9F8F6", fontFamily: "var(--font-geist-sans), Helvetica, sans-serif", color: "#17150F" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "34px 28px 160px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20, paddingBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Reclist</div>
            <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(0.62 0.01 90)" }}>
              {open.length} to try
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setAddOpen(true)} style={{
              display: "flex", alignItems: "center", gap: 8, height: 38, padding: "0 18px",
              border: "none", borderRadius: 999, background: "#17150F", color: "#F9F8F6",
              fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}>
              <span style={{ fontSize: 17, lineHeight: 1, marginTop: -2 }}>+</span> Add
            </button>
            <UserMenu user={user} />
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingBottom: 30, borderBottom: "1px solid oklch(0.9 0.006 90)" }}>
          {[{ key: "all", label: "All", accent: "#17150F", count: open.length }, ...CATS.map((c) => ({ ...c, count: open.filter((r) => r.category === c.key).length }))].map((c) => {
            const active = filter === c.key
            return (
              <button key={c.key} onClick={() => { setFilter(c.key); setExpanded(null) }} style={{
                display: "flex", alignItems: "center", gap: 8, height: 34, padding: "0 14px",
                borderRadius: 999, cursor: "pointer", fontSize: 14,
                background: active ? "#17150F" : "#fff",
                color: active ? "#F9F8F6" : "oklch(0.4 0.01 90)",
                border: active ? "1px solid #17150F" : "1px solid oklch(0.9 0.006 90)",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: active ? "#F9F8F6" : c.accent }} />
                {c.label}
                <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, opacity: 0.5 }}>{c.count}</span>
              </button>
            )
          })}
        </div>

        {/* Sections */}
        {sections.length === 0 && (
          <div style={{ paddingTop: 60, textAlign: "center", color: "oklch(0.65 0.01 90)", fontSize: 15 }}>
            No recs here yet — add one above.
          </div>
        )}
        {sections.map((s) => (
          <div key={s.key} style={{ paddingTop: 34 }}>
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 14 }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, transform: "rotate(45deg)", background: s.accent, flexShrink: 0 }} />
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 90)" }}>{s.label}</div>
              <div style={{ flex: 1, height: 1, background: "oklch(0.92 0.006 90)" }} />
            </div>
            {/* Cards grid */}
            <div style={{ display: "grid", gap: 14, gridTemplateColumns: gridCols }}>
              {s.items.map((rec) => (
                <RecCard
                  key={rec.id}
                  rec={rec}
                  expanded={expanded === rec.id}
                  onToggle={() => setExpanded(expanded === rec.id ? null : rec.id)}
                  onDone={() => { onUpdate(rec.id, { status: "done" }); setExpanded(null) }}
                  onUndo={() => onUpdate(rec.id, { status: "wishlist" })}
                  onDelete={() => { onDelete(rec.id); setExpanded(null) }}
                  onNotesChange={(notes) => onUpdate(rec.id, { notes })}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Done shelf */}
        {done.length > 0 && (
          <div style={{ marginTop: 46, padding: "18px 20px", borderRadius: 12, background: "#F1F0ED" }}>
            <button onClick={() => setDoneOpen((v) => !v)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", padding: 0,
              border: "none", background: "none", cursor: "pointer",
              fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "oklch(0.55 0.01 90)",
            }}>
              {doneOpen ? "▾" : "▸"} Done · {done.length}
            </button>
            {doneOpen && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 14 }} className="animate-rise">
                {done.map((d) => (
                  <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 999, background: "#fff", color: "oklch(0.6 0.01 90)", fontSize: 13 }}>
                    <span style={{ color: "oklch(0.55 0.09 150)" }}>✓</span>
                    {d.title}
                    <span style={{ opacity: 0.6 }}>· {d.recommendedBy}</span>
                    <button onClick={() => onUpdate(d.id, { status: "wishlist" })} style={{ border: "none", background: "none", padding: "0 0 0 4px", fontSize: 11, color: "oklch(0.45 0.14 285)", cursor: "pointer" }}>
                      undo
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <AddPanel
        open={addOpen}
        defaultCategory={defaultCat}
        people={people}
        onSave={(form) => { onAdd(form); setAddOpen(false) }}
        onClose={() => setAddOpen(false)}
        variant="panel"
      />
    </div>
  )
}
