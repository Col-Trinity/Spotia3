"use client";

import { useRouter, usePathname } from "next/navigation";
import { HiOutlineHome, HiOutlineBookOpen, HiOutlineUser } from "react-icons/hi";
import { HiHome, HiBookOpen, HiUser } from "react-icons/hi2";

export function NavBar({ locale }: { locale: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const IsActive = (path: string) => pathname === path;

    return (
        <nav className="fixed z-30  bottom-0 left-0 right-0 bg-white h-16 border-t border-gray-200">
            <div className="flex flex-row justify-center items-center h-full px-2 gap-24">

                <button
                    onClick={() => router.push(`/${locale}/dashboard`)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                >
                    {IsActive(`/${locale}/dashboard`) ? <HiHome className="text-purple-600" size={24} /> : <HiOutlineHome className="text-black" size={24} />}
                    <span className={`text-xs ${IsActive(`/${locale}/dashboard`) ? "text-purple-600" : "text-black"}`}>
                        Inicio
                    </span>
                </button>

                <button
                    onClick={() => router.push(`/${locale}/dashboard/historial`)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                >
                    {IsActive(`/${locale}/dashboard/historial`) ? (
                        <HiBookOpen className="text-purple-600" size={24} />
                    ) : (
                        <HiOutlineBookOpen className="text-black" size={24} />
                    )}
                    <span className={`text-xs ${IsActive(`/${locale}/dashboard/historial`) ? "text-purple-600" : "text-black"}`}>
                        Historial
                    </span>
                </button>

                <button
                    onClick={() => router.push(`/${locale}/dashboard/perfil`)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                >
                    {IsActive(`/${locale}/dashboard/perfil`) ? (
                        <HiUser className="text-purple-600" size={24} />
                    ) : (
                        <HiOutlineUser className="text-black" size={24} />
                    )}
                    <span className={`text-xs ${IsActive(`/${locale}/dashboard/perfil`) ? "text-purple-600" : "text-black"}`}>
                        Perfil
                    </span>
                </button>
            </div>

        </nav>
    )
}