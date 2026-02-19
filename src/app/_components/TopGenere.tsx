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

export default function TopGenere() {
  ChartJS.register(
    CategoryScale,    // Para el eje X (categorías/géneros)
    LinearScale,      // Para el eje Y (números/porcentajes)
    BarElement,       // Para las barras
    Tooltip,          // Para mostrar info al pasar el mouse
    Legend            // Para la leyenda
  );

  const { data: artists, isLoading, isError, error, refetch } = useTopArtists();

  if (!artists) return null;

  const topGenere = topGenres(artists as Artist[]);

console.log('Géneros:', topGenere);
  const topGenereLimited = topGenere;

  const data = {
    labels: topGenereLimited.map((item) => item.genre),
    datasets: [
      {
        label: "Porcentaje de escucha",
        data: topGenereLimited.map((item) => item.percentage),
        backgroundColor: [
          "rgba(34, 202, 236, 0.8)",   // Turquesa
          "rgba(124, 58, 237, 0.8)",   // Morado
          "rgba(236, 72, 153, 0.8)",   // Rosa
          "rgba(34, 197, 94, 0.8)",    // Verde
          "rgba(251, 146, 60, 0.8)",   // Naranja
        ],
        borderColor: [
          "rgba(34, 202, 236, 1)",
          "rgba(124, 58, 237, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(251, 146, 60, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y' as const, // Barras horizontales (más fácil de leer)
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ocultar leyenda (no es necesaria)
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context) {
            return `${context.parsed.x}% de tus escuchas`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max:100,
        ticks: {
          callback: function (value:  string | number) {
            return value + '%'// agrega el simbolo de porcentaje 
          },
          font: {
            size: 12,
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Grid sutil
        }
      },
      y: {
        ticks: {
          font: {
            size: 13,
            weight: 500,
          },
          color: '#fff', // Color blanco para los nombres de géneros
        },
        grid: {
          display: false, // Sin grid vertical
        }
      }
    }
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
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Tus géneros favoritos
      </h2>
      <div className="relative w-full h-80 bg-gray-900/50 rounded-xl p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
