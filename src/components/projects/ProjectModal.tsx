"use client";

import { motion } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";


import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

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

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!mounted) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 pointer-events-none">
                <motion.div
                    layoutId={`project-${project.id}`}
                    className="w-full h-full md:h-auto md:max-h-[85vh] md:max-w-4xl flex flex-col bg-[#0a0a0a] border-x-0 border-y-0 md:border md:border-white/10 rounded-none md:rounded-3xl shadow-2xl pointer-events-auto overflow-hidden relative"
                >
                    {/* Close Button - Sticky/Fixed relative to card */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 transition-all z-50 backdrop-blur-sm"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto flex-1 scrollbar-hide">
                        {/* Header Image Area */}
                        <div className="relative h-64 md:h-80 w-full shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
                            <div className="absolute inset-0 bg-grid-white/[0.05]" />

                            <div className="absolute bottom-8 left-8 md:left-12 z-10">
                                <motion.h2
                                    layoutId={`project-title-${project.id}`}
                                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                                >
                                    {project.title}
                                </motion.h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-white/80">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12 space-y-8">
                            <div className="grid md:grid-cols-[2fr_1fr] gap-12">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-white/40 uppercase tracking-widest mb-3">Overview</h3>
                                        <p className="text-white/80 text-lg leading-relaxed">
                                            {project.description}
                                        </p>
                                        {project.longDescription && (
                                            <p className="text-white/60 leading-relaxed mt-4">
                                                {project.longDescription}
                                            </p>
                                        )}
                                    </div>

                                    {project.features && project.features.length > 0 && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium text-white/40 uppercase tracking-widest mb-3">Key Features</h3>
                                            <ul className="space-y-2 text-white/70">
                                                {project.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className={cn(
                                                            "w-1.5 h-1.5 rounded-full mt-2",
                                                            idx % 3 === 0 ? "bg-blue-500" : idx % 3 === 1 ? "bg-purple-500" : "bg-emerald-500"
                                                        )} />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-medium text-white/40 uppercase tracking-widest mb-3">Links</h3>
                                        <div className="flex flex-col gap-3">
                                            <a href={project.link} target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                                <span className="font-medium text-white">Live Demo</span>
                                                <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white" />
                                            </a>
                                            {project.sourceCode && (
                                                <a href={project.sourceCode} target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                                    <span className="font-medium text-white">Source Code</span>
                                                    <Github className="w-4 h-4 text-white/50 group-hover:text-white" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-white/40 uppercase tracking-widest mb-3">Tech Info</h3>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white/40">Year</span>
                                                <span className="text-white">{project.year}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white/40">client</span>
                                                <span className="text-white">Confidential</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white/40">Role</span>
                                                <span className="text-white">Lead Developer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>,
        document.body
    );
};
