import { TopTracks } from "../data-spotify/top-tracks";
function HistorialPage() {
  return (
    <div className="min-h-screen p-6 mt-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-rose-500 via-violet-600 to-purple-500 bg-clip-text text-transparent">
            Historial de Escucha
          </h1>
          <p className="text-violet-500/80 mt-1 text-base">Aquí puedes ver tu historial de escucha.</p>
        </div>
        <TopTracks timeRange="short_term" />
      </div>
    </div>
  );
}

export default HistorialPage;