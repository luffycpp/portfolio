"use client";


import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Project {
    id: number;
    title: string;
    description: string;
    longDescription?: string;
    features?: string[];
    tags: string[];
    link: string;
    sourceCode?: string;
    year: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
    onClick: () => void;
}

export const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            layoutId={`project-${project.id}`}
            onClick={onClick}
            className={cn(
                "group relative flex items-center gap-8 md:gap-0 cursor-pointer", // cursor-pointer for future modal interaction
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
        >
            {/* Bubble Card */}
            <div className={cn("flex-1 w-full md:w-1/2 pl-12 md:pl-0", isEven ? "md:pr-32" : "md:pl-32")}>
                <div className="relative p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-all duration-500 md:hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 pl-0 md:pl-0">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                                <span key={tag} className="text-xs font-mono text-white/50 px-2 py-1 rounded-full border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <motion.h3 layoutId={`project-title-${project.id}`} className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
                            <span className="bg-gradient-to-br from-white via-blue-500 to-blue-900 bg-clip-text text-transparent">
                                {project.title}
                            </span>
                        </motion.h3>
                        <p className="text-white/60 text-sm md:text-lg mb-6 leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="font-mono text-white/40 text-xs md:text-sm">/{project.year}</span>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connector Node */}
            <div className="absolute left-4 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 z-20 group-hover:scale-150 group-hover:bg-white group-hover:border-white transition-all duration-500 shadow-[0_0_0_4px_rgba(0,0,0,1)]">
                <div className="absolute inset-0 bg-white/50 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
            </div>

            {/* Empty Spacer for alternating layout */}
            <div className="hidden md:block flex-1" />
        </motion.div>
    );
};
