"use client";

import { MdMenu } from "react-icons/md";
import UseImg from "./UseImg";
import MenuToggle from "./MenuToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "./ThemeProvider";

export default function TopNavBar({ onRefresh }: { onRefresh: () => void }) {
  const [button, setButton] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const { theme, toggle } = useTheme();

  return (
    <div className="flex justify-between items-center w-[90%] sm:w-[80%]">
      <div className="relative sm:hidden">
        <button className="" onClick={() => setButton((prev) => !prev)}>
          <MdMenu size={34} />
        </button>
        {button && (
          <MenuToggle setButtonClose={setButton} onRefresh={onRefresh} />
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-violet-200 dark:border-violet-800 text-violet-500 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <LanguageSwitcher />
        <button onClick={() => router.push(`/${locale}/dashboard/perfil`)}>
          <UseImg />
        </button>
      </div>
    </div>
  );
}
