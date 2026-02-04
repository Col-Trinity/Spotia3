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

export default function TopGenere() {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  );

  const { artists, loading, error } = useTopArtists();

  const topGenere = topGenres(artists);
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
  if (loading) return <p>Cargando generos ...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <div>TopGenere Component</div>
      <div className="relative w-full max-w-[600px] h-[300px] sm:h-[300px] md:h-[400px] mx-auto">
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
