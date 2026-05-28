"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Command {
    cmd: string;
    output: string | string[];
}

export const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<Command[]>([]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim().toLowerCase();
        if (!trimmedInput) return;

        let output: string | string[] = "";

        switch (trimmedInput) {
            case "help":
                output = [
                    "Available commands:",
                    "  about     - Learn more about me",
                    "  projects  - List featured projects",
                    "  skills    - Show technical stack",
                    "  contact   - Get contact information",
                    "  clear     - Clear terminal history",
                    "  exit      - Close terminal"
                ];
                break;
            case "about":
                output = "Advanced System Architect specializing in security, AI integration, and high-performance system design.";
                break;
            case "projects":
                output = [
                    "Featured Projects:",
                    "  - AI Career Assistant (Gladitors)",
                    "  - Carbon Analyzer (Gladiators-V2.0)",
                    "  - Bypass & Security Suite"
                ];
                break;
            case "skills":
                output = "Expertise: C#, C++, Python, WinDivert, mitmproxy, VMProtect, Ghidra, React, Node.js, MongoDB.";
                break;
            case "contact":
                output = "Email: contact@luffycpp.dev | GitHub: github.com/luffycpp";
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            case "exit":
                setIsOpen(false);
                setInput("");
                return;
            default:
                output = `Command not found: ${trimmedInput}. Type 'help' for available commands.`;
        }

        setHistory([...history, { cmd: input, output }]);
        setInput("");
    };

    return (
        <>
            {/* Terminal Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors border border-white/10 backdrop-blur-md"
            >
                <TerminalIcon className="w-6 h-6" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-8 z-50 w-full max-w-lg h-[400px] bg-[#0a0a0a]/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col font-mono"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <TerminalIcon className="w-4 h-4 text-blue-500" />
                                <span className="text-xs text-white/60">luffycpp@system: ~</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsOpen(false)} className="hover:text-white text-white/40 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 p-4 overflow-y-auto text-sm space-y-2 scrollbar-hide"
                        >
                            <div className="text-blue-500">Welcome to luffycpp OS v1.0.0</div>
                            <div className="text-white/40 mb-4">Type 'help' to see available commands.</div>

                            {history.map((item, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex gap-2">
                                        <span className="text-emerald-500">➜</span>
                                        <span className="text-blue-400">~</span>
                                        <span className="text-white">{item.cmd}</span>
                                    </div>
                                    <div className="text-white/60 pl-6">
                                        {Array.isArray(item.output) ? (
                                            item.output.map((line, j) => (
                                                <div key={j}>{line}</div>
                                            ))
                                        ) : (
                                            <div>{item.output}</div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <form onSubmit={handleCommand} className="flex gap-2">
                                <span className="text-emerald-500">➜</span>
                                <span className="text-blue-400">~</span>
                                <input
                                    autoFocus
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                                />
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
