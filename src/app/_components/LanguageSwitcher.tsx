"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (nextLocale: string) => {
    const newPath = pathname.replace(new RegExp(`^/${locale}`), `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 border border-gray-300 rounded-full p-0.5">
      <button
        onClick={() => switchTo("es")}
        className={`text-xs font-bold px-2.5 py-1 rounded-full transition ${
          locale === "es"
            ? "bg-purple-600 text-white"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchTo("en")}
        className={`text-xs font-bold px-2.5 py-1 rounded-full transition ${
          locale === "en"
            ? "bg-purple-600 text-white"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        EN
      </button>
    </div>
  );
}
