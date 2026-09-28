"use client"

type View = "board" | "shelf"

export default function ViewSwitcher({ view, onSwitch }: { view: View; onSwitch: (v: View) => void }) {
  const base: React.CSSProperties = {
    height: 28, padding: "0 15px", border: "none", borderRadius: 999,
    fontFamily: "var(--font-geist-sans), Helvetica, sans-serif", fontSize: 12, cursor: "pointer",
  }
  const on: React.CSSProperties  = { ...base, background: "#F9F8F6", color: "#17150F" }
  const off: React.CSSProperties = { ...base, background: "transparent", color: "rgba(249,248,246,0.62)" }

  return (
    <div style={{
      position: "fixed", zIndex: 50, bottom: 18, left: "50%", transform: "translateX(-50%)",
      display: "flex", gap: 2, padding: 3, borderRadius: 999,
      background: "rgba(20,18,15,0.82)", backdropFilter: "blur(8px)",
      boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
    }}>
      <button style={view === "board" ? on : off} onClick={() => onSwitch("board")}>Board</button>
      <button style={view === "shelf" ? on : off} onClick={() => onSwitch("shelf")}>Shelf</button>
    </div>
  )
}
