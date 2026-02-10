'use client';
import { motion } from 'framer-motion';
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
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-200 bg-opacity-70 z-50">
            <motion.svg
                width={100}
                height={100}
                viewBox="0 0 200 200"
            >
                {/* Círculo exterior fijo */}
                <circle cx="100" cy="100" r="90" fill="#111" />

                {/* Grupo que rota */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                    style={{ transformOrigin: "50% 50%" }}
                >
                    {/* Círculos interiores */}
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#222" strokeWidth={2} />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="#222" strokeWidth={2} />
                    <circle cx="100" cy="100" r="50" fill="none" stroke="#222" strokeWidth={2} />
                    <circle cx="100" cy="100" r="25" fill="#6C63FF" />
                    <circle cx="100" cy="100" r="6" fill="#111" />

                    {/* Aguja */}
                    <line
                        x1="100"
                        y1="100"
                        x2="100"
                        y2="40"
                        stroke="#6C63FF"
                        strokeWidth={4}
                        strokeLinecap="round"
                    />
                </motion.g>
            </motion.svg>
             <p className="mt-6 text-lg font-medium">{message}</p>

        </div>



    );
}