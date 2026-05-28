"use client";

import { motion, Variants } from "framer-motion";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface TypewriterTitleProps {
    text: string;
    className?: string;
    delay?: number;
}

export const TypewriterTitle = memo(({ text, className, delay = 0 }: TypewriterTitleProps) => {
    // Split text into characters
    const characters = text.split("");

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: delay },
        },
    };

    const childVariants: Variants = {
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
        hidden: {
            opacity: 0,
        },
    };

    return (
        <motion.div
            className={cn("inline-block", className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    variants={childVariants}
                // Removed inline-block to allow bg-clip-text to work
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.div>
    );
});

TypewriterTitle.displayName = "TypewriterTitle";
