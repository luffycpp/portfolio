"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems, general } from "@/constants";
import { ContactModal } from "./ContactModal";

export const Navbar = () => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
            }
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                    scrolled ? "py-4" : "py-8"
                )}
            >
                <div className="container mx-auto px-6">
                    <div className={cn(
                        "relative flex items-center justify-between p-2 rounded-2xl transition-all duration-300",
                        scrolled ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg" : "bg-transparent"
                    )}>
                        {/* Logo Area */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                <Image
                                    src={general.logo}
                                    alt={general.brandName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="font-semibold text-lg text-white tracking-tight">{general.brandName}</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10">
                            {navItems.map((item) => {
                                const isActive = pathname === item.link;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.link}
                                        onClick={(e) => scrollToSection(e, item.link)}
                                        className={cn(
                                            "relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors",
                                            isActive ? "text-white" : "text-white/60 hover:text-white"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-white/10 rounded-full"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Action */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-base font-medium hover:scale-105 transition-transform"
                            >
                                <span>{general.navCta}</span>
                                <ArrowUpRight className="w-5 h-5" />
                            </button>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-3 rounded-full bg-white/5 border border-white/10 text-white"
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-30 bg-black pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <Link
                                        href={item.link}
                                        onClick={(e) => scrollToSection(e, item.link)}
                                        className="text-3xl font-bold text-white block py-2 border-b border-white/10"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => { setIsContactOpen(true); setIsMobileMenuOpen(false); }}
                                className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-black text-lg font-bold"
                            >
                                <span>{general.navCta}</span>
                                <ArrowUpRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isContactOpen && (
                    <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
};
