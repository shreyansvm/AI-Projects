"use client"

import { useState, useMemo } from "react"
import { CATS, getCat } from "@/lib/cats"
import type { RecItem } from "@/lib/cats"
import RecRow from "./RecRow"
import AddPanel from "./AddPanel"
import UserMenu from "./UserMenu"

type Props = {
  recs: RecItem[]
  user: { name: string; email: string; image: string | null }
  onAdd: (form: { title: string; category: string; details: string; recommendedBy: string; notes: string }) => void
  onUpdate: (id: string, patch: Partial<RecItem>) => void
  onDelete: (id: string) => void
}

export default function RecShelf({ recs, user, onAdd, onUpdate, onDelete }: Props) {
  const [filter, setFilter] = useState("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [doneOpen, setDoneOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const open = recs.filter((r) => r.status === "wishlist")
  const done = recs.filter((r) => r.status === "done")

  const visibleCats = filter === "all" ? CATS : CATS.filter((c) => c.key === filter)
  const sections = visibleCats
    .map((c) => ({ ...c, items: open.filter((r) => r.category === c.key) }))
    .filter((s) => s.items.length > 0)

  const people = useMemo(() => Array.from(new Set(recs.map((r) => r.recommendedBy))).slice(0, 8), [recs])

  const shelfTitle = filter === "all" ? "Everything" : getCat(filter).label
  const defaultCat = filter === "all" ? "movies" : filter

  return (
    <div style={{ minHeight: "100vh", background: "#EFEAE0", fontFamily: "var(--font-geist-sans), Helvetica, sans-serif", color: "#1A1712", display: "grid", gridTemplateColumns: "236px 1fr" }}>

      {/* Sidebar */}
      <div style={{ borderRight: "1px solid oklch(0.85 0.015 80)", padding: "34px 22px", position: "sticky", top: 0, height: "100vh", boxSizing: "border-box", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 30, letterSpacing: "-0.01em", lineHeight: 1 }}>Reclist</div>
        <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.55 0.02 80)", paddingTop: 8 }}>
          Things people told me about
        </div>

        {/* Nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 34 }}>
          {[{ key: "all", label: "All", accent: "#1A1712", count: open.length }, ...CATS.map((c) => ({ ...c, count: open.filter((r) => r.category === c.key).length }))].map((c) => {
            const active = filter === c.key
            return (
              <button key={c.key} onClick={() => { setFilter(c.key); setExpanded(null) }} style={{
                display: "flex", alignItems: "center", gap: 10, height: 36, padding: "0 10px",
                border: "none", borderRadius: 4, cursor: "pointer", fontSize: 14,
                background: active ? "#1A1712" : "transparent",
                color: active ? "#EFEAE0" : "#1A1712",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: c.accent, flexShrink: 0 }} />
                <span style={{ flex: 1, textAlign: "left" }}>{c.label}</span>
                <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, opacity: 0.55 }}>{c.count}</span>
              </button>
            )
          })}
        </div>

        <button onClick={() => setAddOpen(true)} style={{ marginTop: "auto", height: 42, border: "1px solid #1A1712", borderRadius: 4, background: "transparent", fontSize: 14, color: "#1A1712", cursor: "pointer" }}>
          + Add a rec
        </button>

        {/* User */}
        <div style={{ position: "relative", marginTop: 14, paddingTop: 14, borderTop: "1px solid oklch(0.85 0.015 80)" }}>
          <UserMenu user={user} variant="shelf" />
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "34px 46px 160px", maxWidth: 860 }}>
        <div style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 46, lineHeight: 1.05, letterSpacing: "-0.015em", paddingBottom: 6 }}>
          {shelfTitle}
        </div>
        <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.55 0.02 80)", paddingBottom: 26 }}>
          {open.length} waiting · {done.length} done
        </div>

        {/* Inline add form */}
        <AddPanel
          open={addOpen}
          defaultCategory={defaultCat}
          people={people}
          onSave={(form) => { onAdd(form); setAddOpen(false) }}
          onClose={() => setAddOpen(false)}
          variant="inline"
        />

        {/* Sections */}
        {sections.length === 0 && !addOpen && (
          <div style={{ paddingTop: 20, color: "oklch(0.55 0.02 80)", fontSize: 15 }}>
            No recs here yet — add one above.
          </div>
        )}
        {sections.map((s) => (
          <div key={s.key} style={{ paddingBottom: 30 }}>
            <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: s.accent, paddingBottom: 6 }}>
              {s.label}
            </div>
            {s.items.map((rec, i) => (
              <RecRow
                key={rec.id}
                rec={rec}
                index={i}
                expanded={expanded === rec.id}
                onToggle={() => setExpanded(expanded === rec.id ? null : rec.id)}
                onDone={() => { onUpdate(rec.id, { status: "done" }); setExpanded(null) }}
                onUndo={() => onUpdate(rec.id, { status: "wishlist" })}
                onDelete={() => { onDelete(rec.id); setExpanded(null) }}
                onNotesChange={(notes) => onUpdate(rec.id, { notes })}
              />
            ))}
          </div>
        ))}

        {/* Done section */}
        {done.length > 0 && (
          <div style={{ borderTop: "1px solid oklch(0.85 0.015 80)", paddingTop: 18, marginTop: 10 }}>
            <button onClick={() => setDoneOpen((v) => !v)} style={{ border: "none", background: "none", padding: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.55 0.02 80)", cursor: "pointer" }}>
              {doneOpen ? "▾" : "▸"} Done · {done.length}
            </button>
            {doneOpen && (
              <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 12 }} className="animate-rise">
                {done.map((d) => (
                  <div key={d.id} style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "7px 0", color: "oklch(0.58 0.02 80)" }}>
                    <span style={{ color: "oklch(0.55 0.09 150)", fontSize: 13 }}>✓</span>
                    <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 19, textDecoration: "line-through", textDecorationColor: "oklch(0.78 0.02 80)" }}>
                      {d.title}
                    </span>
                    <span style={{ fontSize: 13 }}>{d.recommendedBy}</span>
                    <button onClick={() => onUpdate(d.id, { status: "wishlist" })} style={{ border: "none", background: "none", fontSize: 12, color: "oklch(0.45 0.14 285)", cursor: "pointer" }}>
                      undo
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
