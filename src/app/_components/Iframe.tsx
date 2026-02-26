"use client";
import { useEffect, useRef } from "react";

export function Iframe({ src }: { src: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!document.getElementById("spotify-iframe-api")) {
            const script = document.createElement("script");
            script.id = "spotify-iframe-api";
            script.src = "https://open.spotify.com/embed/iframe-api/v1";
            script.async = true;
            document.body.appendChild(script);
        }
        window.onSpotifyIframeApiReady = (IframeApi) => {
            if (!containerRef.current) return;

            IframeApi.createController(containerRef.current,
                {
                    uri: src,
                },
                (controller) => {
                    console.log("Spotify Iframe API is ready!", controller);
                }
            )
        }
    }, [src]);

    return (
        <div ref={containerRef} className="w-full h-full">

        </div>
    )
}