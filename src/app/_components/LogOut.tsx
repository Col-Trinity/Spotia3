"use client";

import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import { useTranslations } from "next-intl";

export default function LogOut() {
  const t = useTranslations("logout");

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-[rgb(77,74,94)] hover:bg-[rgb(215,206,253)] transition-colors duration-200"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <MdLogout size={20} />
      {t("button")}
    </button>
  );
}
