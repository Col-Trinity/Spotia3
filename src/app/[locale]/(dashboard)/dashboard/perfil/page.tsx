"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import LogOut from "@/src/app/_components/LogOut";
import UseImg from "@/src/app/_components/UseImg";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Cargando...</p>;
  if (!session) return redirect("/auth/login");
  return (
    <div className="min-h-screen p-6 pb-24 mt-4">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>

      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex items-center gap-4 mb-6">
          <UseImg />
          <div>
            <h2 className="text-xl font-semibold">{session.user?.name}</h2>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
        </div>

        <LogOut />
      </div>
    </div>
  );
}
