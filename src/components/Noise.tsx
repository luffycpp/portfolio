"use client";

export const Noise = () => {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
            style={{
                backgroundImage: 'url("/noise.png")', // We'll generate a base64 or SVG noise instead of a file to be self-contained
                backgroundSize: "100px 100px",
            }}
        >
            <svg
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
};
