"use client"

import { useState } from "react"
import { getCat } from "@/lib/cats"
import type { RecItem } from "@/lib/cats"

type Props = {
  rec: RecItem
  index: number
  expanded: boolean
  onToggle: () => void
  onDone: () => void
  onUndo: () => void
  onDelete: () => void
  onNotesChange: (notes: string) => void
}

export default function RecRow({ rec, index, expanded, onToggle, onDone, onUndo, onDelete, onNotesChange }: Props) {
  const [showTip, setShowTip] = useState(false)
  const cat = getCat(rec.category)
  const initial = (rec.recommendedBy || "?")[0].toUpperCase()
  const isDone = rec.status === "done"

  return (
    <div
      onClick={onToggle}
      style={{
        padding: "14px 16px", margin: "0 -16px", borderRadius: 6, cursor: "pointer",
        background: expanded ? "#F7F4EE" : "transparent",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => { if (!expanded) (e.currentTarget as HTMLElement).style.background = "#F7F4EE" }}
      onMouseLeave={(e) => { if (!expanded) (e.currentTarget as HTMLElement).style.background = "transparent" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        {/* Number */}
        <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, color: "oklch(0.68 0.02 80)", width: 22, flexShrink: 0 }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Title + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 25, lineHeight: 1.15, letterSpacing: "-0.01em", textWrap: "pretty" }}>
            {rec.title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 3 }}>
            {rec.details && <div style={{ fontSize: 13, color: "oklch(0.52 0.02 80)" }}>{rec.details}</div>}
          </div>
        </div>

        {/* Recommender */}
        <div
          style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}
          onMouseEnter={(e) => { e.stopPropagation(); setShowTip(true) }}
          onMouseLeave={() => setShowTip(false)}
        >
          <span style={{ width: 22, height: 22, borderRadius: 999, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 600, color: "#F7F4EE", background: cat.accent }}>
            {initial}
          </span>
          <span style={{ fontSize: 13, color: "oklch(0.45 0.02 80)" }}>{rec.recommendedBy}</span>
          {showTip && (
            <div className="animate-rise" style={{
              position: "absolute", bottom: "calc(100% + 6px)", right: 0, zIndex: 20,
              whiteSpace: "nowrap", padding: "6px 10px", borderRadius: 4,
              background: "#1A1712", color: "#EFEAE0", fontSize: 12,
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)", pointerEvents: "none",
            }}>
              {rec.recommendedBy} recommended this
            </div>
          )}
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div style={{ padding: "14px 0 2px 38px" }} className="animate-rise">
          <textarea
            value={rec.notes ?? ""}
            onChange={(e) => onNotesChange(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            rows={2}
            placeholder={`Add a note — what did ${rec.recommendedBy} say about it?`}
            style={{
              width: "100%", maxWidth: "46ch", boxSizing: "border-box", padding: "8px 10px",
              border: "1px dashed oklch(0.82 0.015 80)", borderRadius: 4, background: "transparent",
              fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic",
              fontSize: 19, lineHeight: 1.45, color: "oklch(0.34 0.02 80)", resize: "none", outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: 8, paddingTop: 14 }}>
            <button
              onClick={(e) => { e.stopPropagation(); isDone ? onUndo() : onDone() }}
              style={{ height: 32, padding: "0 16px", border: "1px solid #1A1712", borderRadius: 4, background: "transparent", fontSize: 13, cursor: "pointer" }}
            >
              {isDone ? "Undo done" : "Mark done"}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete() }}
              style={{ height: 32, padding: "0 14px", border: "none", background: "none", fontSize: 13, color: "oklch(0.55 0.02 80)", cursor: "pointer" }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
