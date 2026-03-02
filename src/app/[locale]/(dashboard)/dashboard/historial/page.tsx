import { TopTracks } from "../data-spotify/top-tracks";
function HistorialPage() {
  return (
    <div className="p-4 mt-4">
      <h1 className="text-2xl font-bold">Historial de Escucha</h1>
      <p className="text-gray-500">Aquí puedes ver tu historial de escucha.</p>
      <TopTracks timeRange="short_term" />
    </div>
  );
}

export default HistorialPage;