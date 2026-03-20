"use client";

import { MdMenu } from "react-icons/md";
import UseImg from "./UseImg";
import MenuToggle from "./MenuToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopNavBar({ onRefresh }: { onRefresh: () => void }) {
  const [button, setButton] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="flex justify-between items-center w-[90%] sm:w-[80%]">
      <div className="relative">
        <button className="" onClick={() => setButton((prev) => !prev)}>
          <MdMenu size={34} />
        </button>
        {button && (
          <MenuToggle setButtonClose={setButton} onRefresh={onRefresh} />
        )}
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <button onClick={() => router.push(`/${locale}/dashboard/perfil`)}>
          <UseImg />
        </button>
      </div>
    </div>
  );
}
