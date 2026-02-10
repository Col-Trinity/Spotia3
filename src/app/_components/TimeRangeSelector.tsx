type TypeTimeRange = {
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
};
export default function TimeRangeSelector({
  timeRange,
  setTimeRange,
}: TypeTimeRange) {
  return (
    <div>
      <select
        name="timeRange"
        id="timeRange"
        onChange={(e) => setTimeRange(e.target.value)}
        value={timeRange}
      >
        <option value="short_term">Últimos mes</option>
        <option value="medium_term">Últimos 6 meses</option>
        <option value="long_term">Últimos 12 meses</option>
      </select>
    </div>
  );
}
