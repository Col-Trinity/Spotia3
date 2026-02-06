"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const serchParams = useSearchParams();
  const error = serchParams.get("error");
  console.log(error);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6">
      <h1 className="text-4xl font-extrabold text-green-500 text-center">
        {" "}
        Error de Autenticación{" "}
      </h1>
      <p className="text-lg text-gray-400 text-center max-w-md"> {error}</p>
      <a
        href="/auth/login"
        className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg shadow hover:bg-green-400 transition"
      >
        {" "}
        Reintentar Login{" "}
      </a>
    </div>
  );
}
