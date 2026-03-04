"use client";

import '@/src/app/globals.css';
import { NavBar } from "@/src/app/_components/navBar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "@/src/app/_components/loading";
import { use } from "react";
export default function DashboardLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const { locale } = use(params);
  if (status === "loading") return <Loading />;
  if (!session) return redirect("/auth/login");


  return (
    <div className="pb-16">
      <section className="p-6">
        {children}
      </section>
      <NavBar locale={locale} />
    </div>
  )
}
