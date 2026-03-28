import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "user-read-email user-read-private user-top-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private",
        },
      },
    }),
  ],
  pages: { error: "/auth/error" },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          expires_at: account.expires_at,
          refreshToken: account.refresh_token,
        }
      } else if (Date.now() < (token.expires_at as number) * 1000) {

        return token
      } else {

        if (!token.refreshToken) throw new TypeError("Missing refresh_token")

        try {
          const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Basic " + Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
              ).toString("base64"),
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: token.refreshToken as string,
            }),
          })
          const newTokens = await response.json()
          if (!response.ok) throw newTokens
          return {
            ...token,
            accessToken: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            refreshToken: newTokens.refresh_token ?? token.refreshToken,
          }
        } catch (error) {
          console.error("Error refreshing access_token", error)
          return { ...token, error: "RefreshTokenError" }
        }
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.error = token.error as string

      session.user.image = token.picture as string
      session.user.name = token.name as string
      return session
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
