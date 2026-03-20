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

  return (
    <div>
      <select
        name="timeRange"
        id="timeRange"
        onChange={(e) => setTimeRange(e.target.value)}
        value={timeRange}
      >
        <option value="short_term">{t("lastMonth")}</option>
        <option value="medium_term">{t("last6Months")}</option>
        <option value="long_term">{t("last12Months")}</option>
      </select>
    </div>
  );
}
