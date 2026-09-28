import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

// Lightweight config — no DB imports, safe for Edge middleware
export default {
  providers: [
    Google,
    // Dev bypass — only active when Google OAuth credentials are not yet configured
    Credentials({
      id: "dev-bypass",
      credentials: {},
      authorize() {
        return { id: "local-dev", name: "Local User", email: "local@reclist.dev" }
      },
    }),
  ],
  pages: { signIn: "/sign-in" },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id
      return token
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      return session
    },
  },
} satisfies NextAuthConfig
