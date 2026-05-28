"use client";

import { motion } from "framer-motion";
import { techMarquee } from "@/constants";

export const TechMarquee = () => {
    return (
        <section className="py-12 overflow-hidden relative z-10 border-y border-white/5 bg-white/5 backdrop-blur-sm">
            <div className="flex">
                <motion.div
                    initial={{ x: "-50%" }}
                    animate={{ x: "0%" }}
                    transition={{
                        duration: 50,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-16 pr-16 whitespace-nowrap"
                >
                    {[...techMarquee, ...techMarquee].map((lang, index) => (
                        <span
                            key={index}
                            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 select-none leading-relaxed py-2"
                        >
                            {lang}
                        </span>
                    ))}
                </motion.div>

                {/* Duplicate for seamless visual filling if screen is huge, though the above logic handles the loop self-contained if width is enough. 
            Actually, the standard way is to have the track width contain 2 sets and animate the track.
            If the track is flex container...
        */}
            </div>
        </section>
    );
};
