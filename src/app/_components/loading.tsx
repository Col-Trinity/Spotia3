'use client';

import { useEffect, useState } from 'react';

const messages = [
    "Probando sonido... 1, 2, 3 🎤",
    "Afinando la guitarra invisible 🎸",
    "Cargando tus datos al ritmo del bajo 🎶",
    "El DJ está mezclando tus bits 🎧",
    "La batería está haciendo un solo de carga 🥁",
    "Subiendo el volumen al servidor 🔊",
    "Buscando el acorde perdido 🎼",
    "El público ya está listo, nosotros casi 🎵",
    "Ensayando el coro de tus datos 🎤🎶",
    "Chequeando que no haya feedback digital 🔄"
];
export default function Loading() {
    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        // Cambia el mensaje cada 2 segundos
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * messages.length);
            setMessage(messages[randomIndex]);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-200 bg-opacity-70 z-50">
             <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-6 text-lg font-medium">{message}</p>
        </div>
    );
}