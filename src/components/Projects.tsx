"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "./ui/FadeUp";
import { projects } from "@/constants";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectModal } from "./projects/ProjectModal";

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

export const Projects = memo(() => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleProjectClick = useCallback((project: Project) => {
        setSelectedProject(project);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedProject(null);
    }, []);

    return (
        <section className="py-24 md:py-32 px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center md:text-left">
                        <span className="bg-gradient-to-br from-white via-blue-500 to-blue-900 bg-clip-text text-transparent inline-block pb-1">
                            Selected Work
                        </span>
                    </h2>
                </motion.div>

                <div className="relative pt-8">
                    {/* Central Connector Line */}
                    <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-transparent -translate-x-1/2 md:translate-x-0" />

                    <div className="space-y-16">
                        {projects.map((project, index) => (
                            <FadeUp
                                key={project.id}
                                delay={index * 0.1}
                                className="w-full"
                            >
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    onClick={() => handleProjectClick(project)}
                                />
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={handleCloseModal}
                    />
                )}
            </AnimatePresence>
        </section>
    );
});

Projects.displayName = "Projects";
