"use client";

import { motion } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";


interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [step, setStep] = useState<"form" | "sending" | "success">("form");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep("sending");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStep("success");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full h-full md:h-auto max-w-none md:max-w-lg bg-[#0a0a0a] border-x-0 border-y-0 md:border md:border-white/10 rounded-none md:rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-xl font-semibold text-white">Let&apos;s Connect</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    {step === "form" && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs uppercase tracking-wider text-white/40 font-medium ml-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    placeholder="What&apos;s your name?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs uppercase tracking-wider text-white/40 font-medium ml-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    placeholder="ryan@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs uppercase tracking-wider text-white/40 font-medium ml-1">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black font-semibold rounded-xl py-4 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <span>Send Message</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {step === "sending" && (
                        <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center">
                            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                            <p className="text-white/60">Sending your message...</p>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="min-h-[300px] flex flex-col items-center justify-center gap-6 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-white/60 max-w-xs mx-auto">
                                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="mt-4 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
