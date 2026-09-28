import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isSignedIn = !!req.auth
  const isSignIn = req.nextUrl.pathname === "/sign-in"
  if (!isSignedIn && !isSignIn) {
    return Response.redirect(new URL("/sign-in", req.url))
  }
})

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
