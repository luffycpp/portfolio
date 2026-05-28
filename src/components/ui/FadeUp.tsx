"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

interface FadeUpProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
}

export const FadeUp = memo(({
    children,
    className,
    delay = 0,
    duration = 0.8,
    yOffset = 40
}: FadeUpProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <div ref={ref} className={cn("relative", className)}>
            <motion.div
                initial={{ opacity: 0, y: yOffset }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
                transition={{
                    duration: duration,
                    ease: "easeOut",
                    delay: delay,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
});

FadeUp.displayName = "FadeUp";
