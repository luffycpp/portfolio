"use client";

import { useState, useEffect, useCallback } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { TextPressure } from "./ui/TextPressure";
import { footer } from "@/constants";

export const Footer = () => {
    const [copied, setCopied] = useState(false);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short"
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(footer.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    return (
        <footer id="contact" className="py-16 md:py-24 px-4 relative z-10 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-white/40 text-sm md:text-base font-medium tracking-widest uppercase mb-8">
                        Have an idea?
                    </p>
                    <button
                        onClick={handleCopy}
                        className="group relative inline-block cursor-none md:cursor-pointer focus:outline-none"
                    >
                        <div className="w-full max-w-[90vw] md:max-w-none mx-auto flex flex-col items-center gap-0 md:gap-4">
                            <TextPressure
                                text={footer.ctaLine1}
                                className="text-[12vw] leading-[0.8] md:text-[10vw] uppercase"
                                textClassName="bg-gradient-to-br from-white via-blue-500 to-blue-900 bg-clip-text text-transparent"
                                minWeight={100}
                                maxWeight={900}
                                spread={300}
                            />
                            <TextPressure
                                text={footer.ctaLine2}
                                className="text-[12vw] leading-[0.8] md:text-[10vw] uppercase"
                                textClassName="bg-gradient-to-br from-white via-blue-500 to-blue-900 bg-clip-text text-transparent"
                                minWeight={100}
                                maxWeight={900}
                                spread={300}
                            />
                        </div>

                        <AnimatePresence>
                            {copied && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-6 py-3 rounded-full font-medium text-lg flex items-center gap-2 pointer-events-none"
                                >
                                    <Check className="w-5 h-5" />
                                    <span>Email Copied!</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <div className="mt-8 text-white/40 text-sm md:text-lg animate-pulse">
                        {footer.email}
                    </div>
                </div>

                <div className="mt-32 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
                    <div className="font-mono flex items-center gap-2">
                        <span>&copy; {new Date().getFullYear()} {footer.copyrightName}.</span>
                        <span className="hidden md:inline px-2 text-white/20">•</span>
                        <span className="hidden md:inline">{time}</span>
                    </div>

                    <div className="flex gap-8 font-medium">
                        {footer.socials.map((social: any) => (
                            <a
                                key={social.name}
                                href={social.link}
                                className="hover:text-white transition-colors uppercase tracking-wider"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex gap-2 items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available for work
                    </div>
                </div>
            </div>
        </footer>
    );
};
