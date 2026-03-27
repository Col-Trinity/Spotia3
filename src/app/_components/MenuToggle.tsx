"use client";

import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type Props = {
    setButtonClose: (value: boolean) => void,
    onRefresh: () => void
}

export default function MenuToggle({ setButtonClose }: Props) {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("menu");

    return (
        <div className="fixed top-0 left-0 z-20 w-[30vh] h-screen bg-[rgb(235,231,255)] flex flex-col">
            <button onClick={() => setButtonClose(false)} className="absolute m-4 text-3xl right-0"><RxCross2 /></button>
            <div className="flex flex-col items-start mt-[100%] px-4 gap-4 font-semibold text-lg text-[rgb(77,74,94)]">
                <button onClick={() => router.push(`/${locale}/dashboard`)} className="hover:bg-[rgb(215,206,253)] p-2 mb-4 mx-4 rounded-xl">{t("home")}</button>
                <button className="hover:bg-[rgb(215,206,253)] p-2 mb-4 mx-4 rounded-xl">{t("favorites")}</button>
                <button onClick={() => router.push(`/${locale}/dashboard/historial`)} className="hover:bg-[rgb(215,206,253)] p-2 mb-4 mx-4 rounded-xl">{t("fullHistory")}</button>
            </div>
        </div>
    )
}
