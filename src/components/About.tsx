"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { FadeUp } from "./ui/FadeUp";

import { skills, experience, about } from "@/constants";



export const About = () => {
    const [loadingSkill, setLoadingSkill] = useState<string | null>(null);

    const handleSkillClick = (e: React.MouseEvent, skillName: string, url: string) => {
        e.preventDefault();
        setLoadingSkill(skillName);

        setTimeout(() => {
            window.open(url, "_blank");
            setLoadingSkill(null);
        }, 500);
    };

    return (
        <section className="py-20 md:py-32 px-4 relative z-10">
            <div className="max-w-7xl mx-auto space-y-32">
                {/* About & Skills - Split Layout */}
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <FadeUp>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                                <span className="bg-gradient-to-br from-white via-blue-500 to-blue-900 bg-clip-text text-transparent inline-block pb-1">
                                    {about.titleLine1}
                                </span>
                                <br />
                                <span className="bg-gradient-to-br from-white via-blue-500 to-blue-900 bg-clip-text text-transparent inline-block pb-1">
                                    {about.titleLine2}
                                </span>
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.2} className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden mb-8 border border-white/10">
                            <Image
                                src={about.image}
                                alt="Luffycpp"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                priority
                            />
                        </FadeUp>

                        <FadeUp delay={0.4} className="space-y-6 text-lg text-white/60 leading-relaxed max-w-lg">
                            <p>
                                {about.description}
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.6} className="flex items-center gap-4 text-white/40 pt-4">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm">{about.location}</span>
                        </FadeUp>
                    </div>

                    <div className="space-y-8">
                        <FadeUp delay={0.2} className="text-xl font-medium text-white/40 uppercase tracking-widest">Tech Stack</FadeUp>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill: any, i: number) => (
                                <FadeUp
                                    key={skill.name}
                                    delay={0.3 + (i * 0.02)}
                                    className="inline-block"
                                >
                                    <a
                                        href={skill.url}
                                        onClick={(e) => handleSkillClick(e, skill.name, skill.url)}
                                        className={cn(
                                            "px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 transition-all duration-300 cursor-pointer inline-flex items-center justify-center min-w-[100px]",
                                            "hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-50 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_5px_20px_rgba(59,130,246,0.25)]",
                                            loadingSkill === skill.name && "bg-blue-500/20 border-blue-500 text-blue-200 scale-105"
                                        )}
                                    >
                                        {loadingSkill === skill.name ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            skill.name
                                        )}
                                    </a>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Interactive Experience List - Circuit Layout */}
                <div className="space-y-12">
                    <FadeUp>
                        <h3 className="text-xl font-medium text-white/40 uppercase tracking-widest border-b border-white/10 pb-4">Experience</h3>
                    </FadeUp>

                    <div className="relative pt-8 md:pl-0">
                        {/* Animated Circuit Line */}
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute left-4 md:left-8 top-0 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent"
                        />

                        <div className="space-y-12">
                            {experience.map((job: any, index: number) => (
                                <div key={index} className="relative">
                                    {/* Circuit Node & Beam - Independent Animation */}
                                    <div className="absolute left-4 md:left-8 top-8 w-8 h-4 pointer-events-none z-10">
                                        {/* Node */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + (index * 0.2), duration: 0.5, type: "spring" }}
                                            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border border-white/20 rotate-45"
                                        >
                                            <div className="absolute inset-0 bg-white/50 animate-ping opacity-0 group-hover:opacity-100" />
                                        </motion.div>

                                        {/* Horizontal Beam */}
                                        <motion.div
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            whileInView={{ scaleX: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + (index * 0.2), duration: 0.5 }}
                                            style={{ originX: 0 }}
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10"
                                        />
                                    </div>

                                    <FadeUp
                                        delay={0.2 + (index * 0.1)}
                                        className="relative pl-12 md:pl-16"
                                    >
                                        <div className="group relative p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                                <div>
                                                    <h4 className="text-2xl font-bold mb-2">
                                                        <span className="bg-gradient-to-br from-white via-blue-500 to-blue-900 bg-clip-text text-transparent group-hover:from-white group-hover:via-white group-hover:to-white transition-all duration-300">
                                                            {job.role}
                                                        </span>
                                                    </h4>
                                                    <div className="flex items-center gap-3 text-white/50">
                                                        <span className="font-medium">{job.company}</span>
                                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                                        <span className="font-mono text-xs">{job.year}</span>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                                            </div>

                                            <p className="text-white/60 leading-relaxed mb-6 max-w-2xl">
                                                {job.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {job.skills.map((tech: string) => (
                                                    <span key={tech} className="px-3 py-1 text-xs font-mono text-blue-300/80 bg-blue-500/10 border border-blue-500/20 rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </FadeUp>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
