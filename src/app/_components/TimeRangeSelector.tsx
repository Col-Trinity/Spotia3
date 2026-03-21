"use client";

import { useTranslations } from "next-intl";

type TypeTimeRange = {
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
};

export default function TimeRangeSelector({
  timeRange,
  setTimeRange,
}: TypeTimeRange) {
  const t = useTranslations("timeRange");

  const options = [
    { value: "short_term", label: t("lastMonth") },
    { value: "medium_term", label: t("last6Months") },
    { value: "long_term", label: t("last12Months") },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTimeRange(opt.value)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
            timeRange === opt.value
              ? "bg-violet-500 text-white shadow shadow-violet-300"
              : "border border-violet-200 text-violet-500 hover:border-violet-400 hover:bg-violet-50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
