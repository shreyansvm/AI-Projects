import { signIn } from "@/auth"

const oauthReady =
  !!process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_ID !== "your-google-client-id"

export default function SignInPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F9F8F6",
      fontFamily: "var(--font-geist-sans), Helvetica, sans-serif",
      color: "#17150F",
      display: "grid",
      placeItems: "center",
      padding: "40px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 400, textAlign: "center" }}>

        {/* Brand */}
        <div style={{ display: "flex", justifyContent: "center", gap: 5, paddingBottom: 26 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, transform: "rotate(45deg)", background: "oklch(0.45 0.14 285)", display: "inline-block" }} />
          <span style={{ width: 9, height: 9, borderRadius: 2, transform: "rotate(45deg)", background: "oklch(0.6 0.13 62)", display: "inline-block" }} />
          <span style={{ width: 9, height: 9, borderRadius: 2, transform: "rotate(45deg)", background: "oklch(0.47 0.09 152)", display: "inline-block" }} />
        </div>
        <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.025em" }}>Reclist</div>
        <div style={{ fontSize: 16, lineHeight: 1.55, color: "oklch(0.5 0.01 90)", padding: "10px 0 30px" }}>
          Good advice, saved.
        </div>

        {/* TODO: re-enable once Google OAuth credentials are added to .env.local
        <form action={async () => {
          "use server"
          await signIn("google", { redirectTo: "/board" })
        }}>
          <button type="submit">Continue with Google</button>
        </form>
        */}

        <form action={async () => {
          "use server"
          await signIn("dev-bypass", { redirectTo: "/board" })
        }}>
          <button type="submit" style={{
            width: "100%", height: 48,
            border: "1px solid #17150F",
            borderRadius: 10,
            background: "transparent",
            fontSize: 15, fontWeight: 500,
            color: "#17150F",
            cursor: "pointer",
          }}>
            Get started →
          </button>
        </form>

        <div style={{ fontSize: 12, lineHeight: 1.6, color: "oklch(0.65 0.01 90)", paddingTop: 20 }}>
          Your recs are saved locally on this device.
        </div>
      </div>
    </div>
  )
}

function GoogleIcon({ dimmed }: { dimmed?: boolean }) {
  const opacity = dimmed ? 0.35 : 1
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" style={{ opacity }}>
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  )
}
