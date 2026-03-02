"use client";
import { useEffect, useRef } from "react";
interface SpotifyIframeApi {
    createController(
        element: HTMLDivElement,
        config: { uri: string },
        callback: (controller: SpotifyIframeController) => void
    ): void;
}

interface SpotifyIframeController {
    destroy?(): void;
}


let cachedApi: SpotifyIframeApi | null = null;
const pendingCallbacks: Array<(api: SpotifyIframeApi) => void> = [];

export function Iframe({ src }: { src: string }) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const controllerRef = useRef<SpotifyIframeController | null>(null);

    const spotifyDivRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const wrapper = wrapperRef.current;

        const spotifyDiv = document.createElement("div");
        spotifyDiv.style.width = "100%";
        spotifyDiv.style.height = "380px";
        spotifyDiv.style.borderRadius = "16px";
        spotifyDiv.style.overflow = "hidden";
        spotifyDiv.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        spotifyDivRef.current = spotifyDiv;


        wrapper?.appendChild(spotifyDiv);

        const initController = (api: SpotifyIframeApi) => {
            if (!spotifyDivRef.current) return;

            api.createController(
                spotifyDivRef.current,
                { uri: src },
                (c) => {
                    controllerRef.current = c;
                }
            );
        };

        if (cachedApi) {
            initController(cachedApi);
        } else {
            pendingCallbacks.push(initController);

            if (!document.getElementById("spotify-iframe-api")) {
                const script = document.createElement("script");
                script.id = "spotify-iframe-api";
                script.src = "https://open.spotify.com/embed/iframe-api/v1";
                script.async = true;
                document.body.appendChild(script);
            }

            window.onSpotifyIframeApiReady = (api: SpotifyIframeApi) => {
                cachedApi = api;
                pendingCallbacks.forEach(cb => cb(api));
                pendingCallbacks.length = 0;
            };
        }

        return () => {
            const idx = pendingCallbacks.indexOf(initController);
            if (idx !== -1) pendingCallbacks.splice(idx, 1);


            if (controllerRef.current?.destroy) {
                controllerRef.current.destroy();
            }
            controllerRef.current = null;


            if (spotifyDivRef.current && wrapper?.contains(spotifyDivRef.current)) {
                wrapper.removeChild(spotifyDivRef.current);
            }
            spotifyDivRef.current = null;
        };
    }, [src]);

    return <div ref={wrapperRef} className="w-full max-w-105 h-95"/>;
}