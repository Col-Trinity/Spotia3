import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <div className="flex  items-center justify-center font-sans w-full h-screen bg-linear-to-r from-green-400 to-blue-500 ">
      <main className="flex  w-full max-w-3xl flex-col items-center justify-between  px-16 sm:items-start">
       <Hero />
     
      </main>
    </div>
  );
}
