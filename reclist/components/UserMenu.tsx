"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"

type User = { name: string; email: string; image: string | null }

export default function UserMenu({ user, variant = "board" }: { user: User; variant?: "board" | "shelf" }) {
  const [open, setOpen] = useState(false)
  const initial = user.name[0].toUpperCase()
  const colors = ["oklch(0.45 0.14 285)", "oklch(0.6 0.13 62)", "oklch(0.47 0.09 152)"]
  const color = colors[user.name.charCodeAt(0) % colors.length]

  if (variant === "shelf") {
    return (
      <div style={{ position: "relative" }}>
        <button onClick={() => setOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: 0, border: "none", background: "none", cursor: "pointer", textAlign: "left" }}>
          <span style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 999, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600, color: "#EFEAE0", background: color }}>
            {initial}
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 13, color: "#1A1712", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</span>
            <span style={{ display: "block", fontSize: 11, color: "oklch(0.55 0.02 80)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
          </span>
        </button>
        {open && (
          <div className="animate-rise" style={{ position: "absolute", bottom: "calc(100% + 6px)", left: 0, zIndex: 45, width: "100%", background: "#F7F4EE", border: "1px solid oklch(0.84 0.015 80)", borderRadius: 5, boxShadow: "0 10px 26px rgba(0,0,0,0.14)" }}>
            <button onClick={() => signOut({ callbackUrl: "/sign-in" })} style={{ width: "100%", padding: "11px 13px", border: "none", background: "none", textAlign: "left", fontSize: 13, color: "#1A1712", cursor: "pointer" }}>
              Sign out
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen((v) => !v)} style={{ width: 34, height: 34, border: "none", borderRadius: 999, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", background: color }}>
        {initial}
      </button>
      {open && (
        <div className="animate-rise" style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 45, width: 230, background: "#fff", borderRadius: 11, boxShadow: "0 12px 32px rgba(0,0,0,0.16)", overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid oklch(0.94 0.006 90)" }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: "oklch(0.6 0.01 90)", paddingTop: 2 }}>{user.email}</div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/sign-in" })} style={{ width: "100%", padding: "12px 16px", border: "none", background: "#fff", textAlign: "left", fontSize: 14, color: "#17150F", cursor: "pointer" }}>
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
