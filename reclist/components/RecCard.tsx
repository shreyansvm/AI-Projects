"use client"

import { useState } from "react"
import { getCat } from "@/lib/cats"
import type { RecItem } from "@/lib/cats"

type Props = {
  rec: RecItem
  expanded: boolean
  onToggle: () => void
  onDone: () => void
  onUndo: () => void
  onDelete: () => void
  onNotesChange: (notes: string) => void
}

export default function RecCard({ rec, expanded, onToggle, onDone, onUndo, onDelete, onNotesChange }: Props) {
  const [showTip, setShowTip] = useState(false)
  const cat = getCat(rec.category)
  const initial = (rec.recommendedBy || "?")[0].toUpperCase()
  const isDone = rec.status === "done"

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: 12,
    background: "#fff",
    cursor: "pointer",
    boxShadow: expanded ? "0 10px 26px rgba(0,0,0,0.11)" : "0 2px 8px rgba(0,0,0,0.07)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
    transform: expanded ? "translateY(-2px)" : undefined,
    opacity: isDone ? 0.5 : 1,
  }

  return (
    <div
      onClick={onToggle}
      style={cardStyle}
      onMouseEnter={(e) => { if (!expanded) (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)" }}
      onMouseLeave={(e) => { if (!expanded) (e.currentTarget as HTMLElement).style.transform = "none" }}
    >
      {/* Accent bar */}
      <div style={{ height: 3, background: cat.accent }} />

      <div style={{ padding: "16px 16px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {/* Category label */}
        <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: cat.accent }}>
          {cat.label}
        </div>

        {/* Title + details */}
        <div>
          <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25, textWrap: "pretty" }}>
            {rec.title}
          </div>
          {rec.details && (
            <div style={{ fontSize: 13, color: "oklch(0.6 0.01 90)", paddingTop: 3 }}>{rec.details}</div>
          )}
        </div>

        {/* Expanded: notes + actions */}
        {expanded && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="animate-rise">
            <textarea
              value={rec.notes ?? ""}
              onChange={(e) => onNotesChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              rows={3}
              placeholder={`Add a note — what did ${rec.recommendedBy} say about it?`}
              style={{
                width: "100%", boxSizing: "border-box", padding: "10px 12px",
                border: "1px dashed oklch(0.87 0.006 90)", borderRadius: 8,
                background: "#FCFCFB", fontFamily: "var(--font-geist-sans), Helvetica, sans-serif",
                fontSize: 14, lineHeight: 1.5, color: "oklch(0.35 0.01 90)", resize: "none", outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={(e) => { e.stopPropagation(); isDone ? onUndo() : onDone() }}
                style={{ flex: 1, height: 32, border: "1px solid oklch(0.88 0.006 90)", borderRadius: 8, background: "#fff", fontSize: 13, cursor: "pointer" }}
              >
                {isDone ? "Undo done" : "Mark done"}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete() }}
                style={{ width: 32, height: 32, border: "1px solid oklch(0.88 0.006 90)", borderRadius: 8, background: "#fff", fontSize: 13, color: "oklch(0.55 0.01 90)", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Recommender */}
        <div
          style={{ position: "relative", marginTop: "auto", paddingTop: 4, display: "flex", alignItems: "center", gap: 8, alignSelf: "flex-start" }}
          onMouseEnter={(e) => { e.stopPropagation(); setShowTip(true) }}
          onMouseLeave={() => setShowTip(false)}
        >
          <span style={{ width: 20, height: 20, borderRadius: 999, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 600, color: "#fff", background: cat.accent, flexShrink: 0 }}>
            {initial}
          </span>
          <span style={{ fontSize: 13, color: "oklch(0.55 0.01 90)" }}>{rec.recommendedBy}</span>
          {showTip && (
            <div className="animate-rise" style={{
              position: "absolute", bottom: "calc(100% + 6px)", left: 0, zIndex: 20,
              whiteSpace: "nowrap", padding: "6px 10px", borderRadius: 7,
              background: "#17150F", color: "#F9F8F6", fontSize: 12,
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)", pointerEvents: "none",
            }}>
              {rec.recommendedBy} recommended this
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
