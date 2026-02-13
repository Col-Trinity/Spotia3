"use client";
import "@/src/app/globals.css";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <Providers>
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
