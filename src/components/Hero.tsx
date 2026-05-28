"use client";

import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { TypewriterTitle } from "./ui/TypewriterTitle";
import { hero } from "@/constants";

interface Sparkle {
    id: number;
    size: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
}

export const Hero = memo(() => {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        // eslint-disable-next-line
        setSparkles([...Array(20)].map((_, i) => ({
            id: i,
            size: Math.random() * 2 + 1,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5
        })));
    }, []);

    return (
        <section
            id={hero.id}
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
            {/* Background elements moved to global Background component */}

            {/* Sparkles */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0, 0], scale: [0, 1, 0] }}
                        transition={{
                            duration: sparkle.duration,
                            repeat: Infinity,
                            delay: sparkle.delay,
                        }}
                        style={{
                            left: `${sparkle.left}%`,
                            top: `${sparkle.top}%`,
                            width: sparkle.size,
                            height: sparkle.size,
                        }}
                        className="absolute bg-white rounded-full accent-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                ))}
            </div>

            <div className="z-10 text-center space-y-8 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 mb-8 hover:bg-white/10 transition-colors cursor-default"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for new projects
                </motion.div>

                <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold tracking-tight leading-tight pb-2">
                    <div className="flex flex-col items-center">
                        {hero.titleWords.map((line: string, i: number) => (
                            <TypewriterTitle
                                key={i}
                                text={line}
                                delay={i * 0.5}
                                className="bg-gradient-to-br from-white via-blue-500 to-blue-900 bg-clip-text text-transparent pb-2"
                            />
                        ))}
                    </div>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light px-4"
                >
                    {hero.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-4"
                >
                    <a
                        href={hero.primaryCta.link}
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 text-center"
                    >
                        {hero.primaryCta.text}
                    </a>
                    <a
                        href={hero.secondaryCta.link}
                        className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all hover:scale-105 active:scale-95 text-center"
                    >
                        {hero.secondaryCta.text}
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                />
            </motion.div>
        </section>
    );
});

Hero.displayName = "Hero";
