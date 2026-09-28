import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import { accounts, sessions, users, verificationTokens } from "@/db/schema"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  events: {
    async signIn({ user }) {
      // Credentials bypass doesn't go through the adapter, so upsert the user manually
      if (user.id === "local-dev") {
        await db.insert(users).values({
          id: "local-dev",
          name: "Local User",
          email: "local@reclist.dev",
        }).onConflictDoNothing()
      }
    },
  },
})
