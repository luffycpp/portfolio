"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    baseAlpha: number;
    phase: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 2;
        this.baseAlpha = Math.random() * 0.5 + 0.1;
        this.alpha = this.baseAlpha;
        this.phase = Math.random() * Math.PI * 2;
        this.color = "255, 255, 255";
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update(width: number, height: number, mouseX: number, mouseY: number) {
        // Natural movement
        this.x += this.vx;
        this.y += this.vy;

        // Wall bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Twinkle effect
        this.phase += 0.05;
        this.alpha = this.baseAlpha + Math.sin(this.phase) * 0.1;

        // Mouse interaction - gentle repulsion
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxDistance - distance) / maxDistance;

            // Stronger Push
            const pushStrength = 4;
            this.vx -= forceDirectionX * force * 0.05 * pushStrength;
            this.vy -= forceDirectionY * force * 0.05 * pushStrength;

            // Bloom effect on hover
            this.size = Math.min(4, this.size + 0.1);
        } else if (this.size > 2) {
            this.size -= 0.05; // Return to normal size
        }
    }
}

export const Background = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseXModel = useMotionValue(0);
    const mouseYModel = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseXModel.set(e.clientX);
            mouseYModel.set(e.clientY);
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseXModel, mouseYModel]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Increase number of particles for "much better" density
        const PARTICLE_COUNT = 100;
        const particles: Particle[] = [];

        canvas.width = width;
        canvas.height = height;

        // Initialize particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle(width, height));
        }

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach((particle) => {
                particle.update(width, height, mouseX, mouseY);
                particle.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Darker gradient for better contrast */}
            <div className="absolute inset-0 bg-[#050505] transition-colors duration-1000" />

            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-100 transition duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseXModel}px ${mouseYModel}px,
                            rgba(255, 255, 255, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* Aurora / Mesh Gradient Mesh - Subtle */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-20 blur-[100px] animate-blob-spin">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen opacity-40 animate-blob" />
                <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen opacity-40 animate-blob animation-delay-2000" />
                <div className="absolute top-2/3 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen opacity-40 animate-blob animation-delay-4000" />
            </div>

            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 opacity-60"
            />

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: 'repeat' }}
            />
        </div>
    );
};
