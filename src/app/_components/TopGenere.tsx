import { topGenres } from "@/src/utils/topGenere";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import Loading from "@/src/app/_components/loading";
import { Artist } from "@/src/types/spotify";

export default function TopGenere() {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  );

  const { data: artists, isLoading, isError, error, refetch } = useTopArtists();

  if (!artists) return null;
  const topGenere = topGenres(artists as Artist[]);
  const topGenereLimited = topGenere.slice(0, 5);

  const data = {
    labels: topGenereLimited.map((item) => item.genre),
    datasets: [
      {
        label: "%",
        data: topGenereLimited.map((item) => item.percentage),
        backgroundColor: "rgba(34, 202, 236, 0.2)",
        borderColor: "rgba(34, 202, 236, 1)",
        pointBackgroundColor: "rgba(34, 202, 236, 1)",
      },
    ],
  };

  if (isLoading) return <Loading />;
  if (isError) return (
    <div>
      <p>{(error as Error).message}</p>
      <button
        onClick={() => refetch()}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Reintentar
      </button>
    </div>

  );
  return (
    <div>
      <div>TopGenere Component</div>
      <div className="relative w-full max-w-150 h-75 sm:h-75 md:h-100 mx-auto">
        <Radar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: { beginAtZero: true, max: 40, ticks: { stepSize: 20 } },
            },
          }}
        />
      </div>
    </div>
  );
}
