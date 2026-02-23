import { topGenres } from "@/src/utils/topGenere";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTopArtists } from "@/src/hooks/useTopArtists";
import Loading from "@/src/app/_components/loading";
import { Artist } from "@/src/types/spotify";
import Image from 'next/image';

export default function TopGenere() {
  ChartJS.register(
    CategoryScale,    // Para el eje X (categorías/géneros)
    LinearScale,      // Para el eje Y (números/porcentajes)
    BarElement,       // Para las barras
    Tooltip,          // Para mostrar info al pasar el mouse
    Legend,          // Para la leyenda
  );

  const { data: artists, isLoading, isError, error, refetch } = useTopArtists();

  if (isLoading) return <Loading />;
  if (isError) return (
    <div>
      <p>{(error as Error).message}</p>
      <button onClick={() => refetch()}>Reintentar</button>
    </div>
  );
  if (!artists) return null;

  const topGenere = topGenres(artists as Artist[]);

  const data = {
    labels: topGenere.map((item) => item.genre),
    datasets: [
      {
        label: "Porcentaje",
        data: topGenere.map((item) => item.percentage),
        backgroundColor: topGenere.map((_, index) =>
          `rgba(29, 185, 84, ${1 - index * 0.15})`
        ),
        borderColor: "rgba(29, 185, 84, 1)",
        borderWidth: 2,
        borderRadius: 12,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: function (context) {
            const item = topGenere[context.dataIndex];
            return [
              `${context.parsed.x}%`,
              `${item.count} artistas`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value: string | number) {
            return value + '%';
          },
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        }
      }
    }
  };
  return (
    <div className="w-115 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Tus géneros favoritos
      </h2>
      <div className="relative bg-linear-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl">
        <div className="absolute left-6 top-6 h-80 flex flex-col justify-around z-10">
          {topGenere.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.genre}
                    width={40}
                    height={40}
                    className="rounded-full object-cover shadow-lg border-2 border-gray-800"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700">
                    <span className="text-lg">🎵</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white capitalize">
                  {item.genre}
                </span>
                <span className="text-xs text-gray-400">
                  {item.count} {item.count === 1 ? 'artista' : 'artistas'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-80 bg-black rounded-xl p-4 pl-40">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
