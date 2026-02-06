import { Link } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6">
      <h1 className="text-6xl font-extrabold">
        404 - Not Found
      </h1>
      <p className="text-lg text-gray-400">
        Ups... esta página suena desafinada 🎵
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg shadow hover:bg-green-400 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
