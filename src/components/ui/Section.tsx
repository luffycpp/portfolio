"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    id?: string;
}

export const Section = memo(({ children, className, delay = 0, id }: SectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-10%" });

    return (
        <section id={id} ref={ref} className={cn("relative", className)}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: delay,
                }}
            >
                {children}
            </motion.div>
        </section>
    );
});

Section.displayName = "Section";
