import Link from 'next/link';

export function Hero() {
    return (
        <div className="flex flex-col items-center justify-center text-white w-full">

            <h1 className="text-5xl font-bold mb-4 flex items     ">Bienvenido a SpotIA</h1>
            <div className="max-w-md mx-auto text-center">
                <p className="text-md mb-8 leading-relaxed">
                    Descubre tus estadísticas de Spotify de una manera fácil y visual.
                </p>
                <p className="text-md mb-8 leading-relaxed">
                    Inicia sesión con tu cuenta de Spotify para ver tus artistas, canciones y álbumes más escuchados.
                </p>
                <p className="text-md mb-8 leading-relaxed">
                    ¡Explora tus hábitos de escucha y comparte tus estadísticas con tus amigos!
                </p>
            </div>


            <Link href="/auth/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Iniciar sesión
                </button>
            </Link>
        </div>
    )
}