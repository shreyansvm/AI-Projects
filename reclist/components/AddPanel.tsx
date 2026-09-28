"use client"

import { useState, useEffect } from "react"
import { CATS, getCat } from "@/lib/cats"

type Form = { title: string; category: string; details: string; recommendedBy: string; notes: string }

type Props = {
  open: boolean
  defaultCategory?: string
  people: string[]
  onSave: (form: Form) => void
  onClose: () => void
  variant?: "panel" | "inline"
}

const empty = (cat = "movies"): Form => ({ title: "", category: cat, details: "", recommendedBy: "", notes: "" })

export default function AddPanel({ open, defaultCategory = "movies", people, onSave, onClose, variant = "panel" }: Props) {
  const [form, setForm] = useState<Form>(empty(defaultCategory))

  useEffect(() => {
    if (open) setForm(empty(defaultCategory))
  }, [open, defaultCategory])

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const save = () => {
    if (!form.title.trim()) return
    onSave({ ...form, recommendedBy: form.recommendedBy.trim() || "Me" })
  }

  const detailsPlaceholder = getCat(form.category).detailsPlaceholder

  if (!open) return null

  if (variant === "inline") {
    return (
      <div style={{
        border: "1px solid #1A1712",
        borderRadius: 6,
        background: "#F7F4EE",
        padding: "18px 20px",
        marginBottom: 22,
      }} className="animate-rise">
        <input
          autoFocus
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && save()}
          placeholder="What did they recommend?"
          style={{
            border: "none",
            borderBottom: "1px solid oklch(0.84 0.015 80)",
            background: "transparent",
            padding: "0 0 8px",
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            fontSize: 26,
            outline: "none",
            width: "100%",
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, paddingTop: 14 }}>
          {CATS.map((c) => {
            const on = form.category === c.key
            return (
              <button key={c.key} onClick={() => set("category", c.key)} style={{
                height: 30, padding: "0 13px", borderRadius: 999, fontSize: 13, cursor: "pointer",
                background: on ? c.accent : "transparent",
                color: on ? "#F7F4EE" : "oklch(0.42 0.02 80)",
                border: on ? `1px solid ${c.accent}` : "1px solid oklch(0.84 0.015 80)",
              }}>{c.label}</button>
            )
          })}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 14 }}>
          <input
            value={form.recommendedBy}
            onChange={(e) => set("recommendedBy", e.target.value)}
            placeholder="Who said it?"
            style={{ width: 170, height: 38, padding: "0 12px", border: "1px solid oklch(0.86 0.015 80)", borderRadius: 4, background: "#fff", fontSize: 14, outline: "none" }}
          />
          <input
            value={form.details}
            onChange={(e) => set("details", e.target.value)}
            placeholder={detailsPlaceholder}
            style={{ flex: 1, minWidth: 160, height: 38, padding: "0 12px", border: "1px solid oklch(0.86 0.015 80)", borderRadius: 4, background: "#fff", fontSize: 14, outline: "none" }}
          />
        </div>
        <div style={{ display: "flex", gap: 10, paddingTop: 14 }}>
          <button onClick={save} style={{ height: 38, padding: "0 22px", border: "none", borderRadius: 4, background: "#1A1712", color: "#EFEAE0", fontSize: 14, cursor: "pointer" }}>Save</button>
          <button onClick={onClose} style={{ height: 38, padding: "0 16px", border: "none", background: "none", fontSize: 14, color: "oklch(0.5 0.02 80)", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    )
  }

  // Panel variant (Board)
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(23,21,15,0.28)", display: "flex", justifyContent: "flex-end" }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 380, maxWidth: "92vw", height: "100%", background: "#fff",
        boxShadow: "-12px 0 40px rgba(0,0,0,0.14)",
        display: "flex", flexDirection: "column",
        fontFamily: "var(--font-geist-sans), Helvetica, sans-serif",
      }} className="animate-slide">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 24px 18px", borderBottom: "1px solid oklch(0.93 0.006 90)" }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Add a rec</div>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 15, color: "oklch(0.6 0.01 90)", cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 20, overflow: "auto", flex: 1 }}>
          <Field label="Title">
            <input
              autoFocus
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && save()}
              placeholder="e.g. Nopalito"
              style={inputStyle}
            />
          </Field>

          <Field label="Category">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {CATS.map((c) => {
                const on = form.category === c.key
                return (
                  <button key={c.key} onClick={() => set("category", c.key)} style={{
                    display: "flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px",
                    borderRadius: 999, fontSize: 13, cursor: "pointer",
                    background: on ? c.accent : "#fff",
                    color: on ? "#fff" : "oklch(0.45 0.01 90)",
                    border: on ? `1px solid ${c.accent}` : "1px solid oklch(0.9 0.006 90)",
                  }}>{c.label}</button>
                )
              })}
            </div>
          </Field>

          <Field label="Details">
            <input
              value={form.details}
              onChange={(e) => set("details", e.target.value)}
              placeholder={detailsPlaceholder}
              style={inputStyle}
            />
          </Field>

          <Field label="Recommended by">
            <input
              value={form.recommendedBy}
              onChange={(e) => set("recommendedBy", e.target.value)}
              placeholder="e.g. Mom"
              style={inputStyle}
            />
            {people.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 6 }}>
                {people.map((p) => (
                  <button key={p} onClick={() => set("recommendedBy", p)} style={{
                    padding: "4px 10px", border: "1px solid oklch(0.91 0.006 90)", borderRadius: 999,
                    background: "#fff", fontSize: 12, color: "oklch(0.5 0.01 90)", cursor: "pointer",
                  }}>{p}</button>
                ))}
              </div>
            )}
          </Field>

          <Field label="Notes">
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder={`Optional — what did they say about it?`}
              style={{ ...inputStyle, height: "auto", padding: "11px 13px", lineHeight: 1.5, resize: "none" }}
            />
          </Field>
        </div>

        <div style={{ display: "flex", gap: 10, padding: "18px 24px", borderTop: "1px solid oklch(0.93 0.006 90)" }}>
          <button onClick={save} style={{ flex: 1, height: 42, border: "none", borderRadius: 9, background: "#17150F", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Save
          </button>
          <button onClick={onClose} style={{ height: 42, padding: "0 18px", border: "1px solid oklch(0.89 0.006 90)", borderRadius: 9, background: "#fff", fontSize: 14, color: "oklch(0.45 0.01 90)", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  height: 42, padding: "0 13px", border: "1px solid oklch(0.89 0.006 90)",
  borderRadius: 9, background: "#FCFCFB", fontSize: 15, outline: "none", width: "100%",
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.55 0.01 90)" }}>
        {label}
      </label>
      {children}
    </div>
  )
}
