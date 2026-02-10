'use client';
import { signIn, getProviders } from 'next-auth/react';
import { useEffect, useState, JSX } from 'react';


const providerIcons: Record<string, JSX.Element> = {
  spotify: (
    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  google: (
    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.35 11.1h-9.18v2.92h5.32c-.23 1.24-1.4 3.64-5.32 3.64-3.21 0-5.84-2.64-5.84-5.86s2.63-5.86 5.84-5.86c1.83 0 3.05.78 3.75 1.45l2.56-2.48C17.34 3.9 15.43 3 12.17 3 6.95 3 2.8 7.15 2.8 12.36s4.15 9.36 9.37 9.36c5.41 0 8.99-3.8 8.99-9.16 0-.62-.07-1.09-.21-1.46z" />
    </svg>
  ),
  github: (
    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.8 2.75 1.28 3.42.98.11-.76.41-1.28.75-1.58-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.99.01 1.99.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
    </svg>
  ),
};

export default function LoginPage() {
  const [providers, setProviders] = useState<Awaited<ReturnType<typeof getProviders>> | null>(null);

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov));
  }, []);

  const locale = 'es';

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-sm space-y-6">
       
        <p className="text-lg font-semibold border-b-2 border-green-600 pb-2 w-full text-center">
          Elige cómo quieres logearte
        </p>

        <div className="flex flex-col space-y-4 w-full">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                onClick={() =>
                  signIn(provider.id, { callbackUrl: `/${locale}/dashboard` })
                }
                className="w-full bg-gray-100 hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded flex items-center justify-center transition shadow-sm"
              >
                {providerIcons[provider.id]}
                Sign in with {provider.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

