"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { general } from "@/constants";

interface PreloaderProps {
    onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
    const [zoom, setZoom] = useState(false);

    useEffect(() => {
        // Trigger zoom
        const timer = setTimeout(() => {
            setZoom(true);
        }, 1500);

        // Complete
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 2200);

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-black to-black overflow-hidden pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: zoom ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        >
            <div className="relative flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{
                        opacity: 1,
                        scale: zoom ? 150 : 1,
                        filter: "blur(0px)"
                    }}
                    transition={{
                        opacity: { duration: 0.5 },
                        scale: {
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1], // Aggressive easing
                            delay: 0
                        },
                        filter: { duration: 0.5 }
                    }}
                    className="relative font-bold text-[10vw] leading-none select-none z-10 bg-gradient-to-br from-white via-blue-500 to-blue-900 bg-clip-text text-transparent"
                >
                    {general.preloaderText}
                </motion.div>
            </div>
        </motion.div>
    );
};
