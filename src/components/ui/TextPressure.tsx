import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, memo } from "react";

interface TextPressureProps {
    text: string;
    className?: string; // Container style (font size, etc)
    textClassName?: string; // Text gradient style
    minWeight?: number;
    maxWeight?: number;
    spread?: number;
}

export const TextPressure = memo(({
    text,
    className = "",
    textClassName = "",
    minWeight = 200,
    maxWeight = 900,
    spread = 200
}: TextPressureProps) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000); // Not currently used but good to have
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseleave", () => {
                mouseX.set(-1000);
                mouseY.set(-1000);
            });
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, [mouseX, mouseY]);

    return (
        <h2
            ref={containerRef}
            className={`flex justify-between w-full select-none ${className}`}
        >
            {text.split("").map((char, i) => (
                <Char
                    key={i}
                    char={char}
                    minWeight={minWeight}
                    maxWeight={maxWeight}
                    spread={spread}
                    mouseX={mouseX}
                    textClassName={textClassName}
                    containerSize={containerSize}
                />
            ))}
        </h2>
    );
});

TextPressure.displayName = "TextPressure";

interface CharProps {
    char: string;
    minWeight: number;
    maxWeight: number;
    spread: number;
    mouseX: MotionValue<number>;
    textClassName: string;
    containerSize: { width: number; height: number };
}

const Char = memo(({ char, minWeight, maxWeight, spread, mouseX, textClassName, containerSize }: CharProps) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        if (spanRef.current) {
            setLeft(spanRef.current.offsetLeft);
        }
    }, [char, containerSize]);

    // Create transforms based on mouseX
    const distance = useTransform(mouseX, (val: number) => {
        const charCenter = left + (spanRef.current?.offsetWidth || 0) / 2;
        return Math.abs(val - charCenter);
    });

    const targetWeight = useTransform(distance, (dist: number) => {
        if (dist > spread) return minWeight;
        const progress = 1 - (dist / spread);
        const smooth = Math.sin(progress * Math.PI / 2);
        return minWeight + (maxWeight - minWeight) * smooth;
    });

    const targetRotate = useTransform(mouseX, (val: number) => {
        const charCenter = left + (spanRef.current?.offsetWidth || 0) / 2;
        const dist = Math.abs(val - charCenter);
        if (dist > spread) return 0;

        const progress = 1 - (dist / spread);
        const smooth = Math.sin(progress * Math.PI / 2);
        const offsetX = val - charCenter;
        return -(offsetX / spread) * 30 * smooth;
    });

    // Smooth out the changes
    const springWeight = useSpring(targetWeight, { stiffness: 180, damping: 12, mass: 0.1 });
    const springRotate = useSpring(targetRotate, { stiffness: 180, damping: 12, mass: 0.1 });

    return (
        <motion.span
            className="inline-block origin-bottom"
            style={{ rotate: springRotate }}
        >
            <motion.span
                ref={spanRef}
                className={`inline-block transition-colors duration-200 ${textClassName}`}
                style={{
                    fontVariationSettings: useTransform(springWeight, (w) => `'wght' ${w}`),
                    fontWeight: springWeight,
                    backgroundSize: `${containerSize.width}px 100%`,
                    backgroundPosition: `-${left}px 0`,
                }}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        </motion.span>
    );
});

Char.displayName = "Char";
