import { topGenres } from "@/src/utils/topGenere";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTopArtists } from "@/src/hooks/useTopArtists";

export default function TopGenere() {
  ChartJS.register(
    CategoryScale,
    PointElement,
    BarElement,
    LinearScale,
    LineElement,
    Title,
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
        backgroundColor: ["red", "blue", "green", "yellow", "purple", "orange"],
      },
    ],
  };
  if (loading) return <p>Cargando generos ...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <div>TopGenere Component</div>

      <Bar data={data} />
    </div>
  );
}
