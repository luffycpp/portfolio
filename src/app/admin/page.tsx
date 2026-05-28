"use client";

import { useState, useEffect } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    Plus,
    Trash2,
    LayoutDashboard,
    Briefcase,
    Code2,
    FolderGit2,
    LogOut,
    Loader2,
    Home,
    User,
    Mail,
    Settings,
    Layers,
    Menu,
    X
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

// --- Types ---

interface NavItem {
    name: string;
    link: string;
}

interface Skill {
    name: string;
    url: string;
}

interface Experience {
    role: string;
    company: string;
    year: string;
    description: string;
    skills: string[];
}

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    link: string;
    year: string;
}

interface Hero {
    titleWords: string[];
    description: string;
    primaryCta: { text: string; link: string };
    secondaryCta: { text: string; link: string };
    id: string;
}

interface About {
    titleLine1: string;
    titleLine2: string;
    description: string;
    image: string;
    location: string;
}

interface Footer {
    ctaLine1: string;
    ctaLine2: string;
    email: string;
    copyrightName: string;
    socials: { name: string; link: string }[];
}

interface General {
    brandName: string;
    logo: string;
    navCta: string;
    preloaderText: string;
}

interface PortfolioData {
    navItems: NavItem[];
    skills: Skill[];
    experience: Experience[];
    projects: Project[];
    hero: Hero;
    about: About;
    footer: Footer;
    general: General;
    techMarquee: string[];
}

// --- Components ---

const SectionCard = ({ title, children, className = "" }: { title?: string, children: React.ReactNode, className?: string }) => (
    <GlassCard className={`p-6 ${className}`} disableTilt={true}>
        {title && <h3 className="text-lg font-semibold mb-6 text-white/90 border-b border-white/5 pb-4">{title}</h3>}
        {children}
    </GlassCard>
);

const Input = ({ label, value, onChange, className = "", placeholder = "" }: any) => (
    <div className={`space-y-2 ${className}`}>
        <label className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</label>
        <div className="relative group">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200"
            />
            <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200" />
        </div>
    </div>
);

const TextArea = ({ label, value, onChange, placeholder = "" }: any) => (
    <div className="space-y-2">
        <label className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</label>
        <div className="relative group">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200 resize-y min-h-[100px]"
            />
            <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200" />
        </div>
    </div>
);

// --- Main Page ---

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<PortfolioData | null>(null);
    const [activeTab, setActiveTab] = useState<keyof PortfolioData | 'general_branding'>("general_branding");
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Initial Login Check
    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin");
            if (res.ok) {
                const fetchedData = await res.json();
                setData(fetchedData);
                setIsAuthenticated(true);
            } else {
                setFeedback({ type: 'error', message: 'Failed to fetch data' });
            }
        } catch (e) {
            setFeedback({ type: 'error', message: 'Connection error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setFeedback(null);
        try {
            const res = await fetch("/api/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, data }),
            });

            const result = await res.json();

            if (res.ok) {
                setFeedback({ type: 'success', message: 'Changes saved successfully!' });
                setTimeout(() => setFeedback(null), 3000);
            } else {
                setFeedback({ type: 'error', message: result.error || 'Failed to save' });
            }
        } catch (e) {
            setFeedback({ type: 'error', message: 'Error saving changes' });
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <GlassCard className="w-full max-w-md p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                        <p className="text-white/60">Enter your password to manage portfolio content.</p>
                    </div>
                    <div className="space-y-4">
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                        />
                        <Button
                            onClick={handleLogin}
                            disabled={loading || !password}
                            className="w-full"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Access Dashboard"}
                        </Button>
                        {feedback && (
                            <p className={`text-sm text-center ${feedback.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                                {feedback.message}
                            </p>
                        )}
                    </div>
                </GlassCard>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="flex h-screen bg-transparent text-white overflow-hidden relative z-10">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Column */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 h-full p-4 transform transition-transform duration-300 ease-in-out shrink-0
                md:relative md:translate-x-0 md:w-80
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <GlassCard className="h-full flex flex-col p-4 overflow-y-auto no-scrollbar" disableTilt={true}>
                    <div className="mb-4 px-2 flex justify-between items-start">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                                <LayoutDashboard className="w-6 h-6 text-blue-400" />
                            </div>
                            <h1 className="text-xl font-bold">Dashboard</h1>
                            <p className="text-xs text-white/40">v1.0.0</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-white/60"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="space-y-2 flex-1">
                        <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest px-4 mb-2">Editor</h2>
                        <TabButton
                            active={activeTab === 'general_branding'}
                            onClick={() => { setActiveTab('general_branding'); setIsMobileMenuOpen(false); }}
                            icon={<Settings />}
                            label="General / Identity"
                        />
                        <TabButton
                            active={activeTab === 'hero'}
                            onClick={() => { setActiveTab('hero'); setIsMobileMenuOpen(false); }}
                            icon={<Home />}
                            label="Hero Section"
                        />
                        <TabButton
                            active={activeTab === 'about'}
                            onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
                            icon={<User />}
                            label="About Section"
                        />
                        <TabButton
                            active={activeTab === 'projects'}
                            onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }}
                            icon={<FolderGit2 />}
                            label="Projects"
                        />
                        <TabButton
                            active={activeTab === 'experience'}
                            onClick={() => { setActiveTab('experience'); setIsMobileMenuOpen(false); }}
                            icon={<Briefcase />}
                            label="Experience"
                        />
                        <TabButton
                            active={activeTab === 'skills'}
                            onClick={() => { setActiveTab('skills'); setIsMobileMenuOpen(false); }}
                            icon={<Code2 />}
                            label="Skills"
                        />
                        <TabButton
                            active={activeTab === 'techMarquee'}
                            onClick={() => { setActiveTab('techMarquee'); setIsMobileMenuOpen(false); }}
                            icon={<Layers />}
                            label="Tech Marquee"
                        />
                        <TabButton
                            active={activeTab === 'footer'}
                            onClick={() => { setActiveTab('footer'); setIsMobileMenuOpen(false); }}
                            icon={<Mail />}
                            label="Footer / Contact"
                        />
                        <TabButton
                            active={activeTab === 'navItems'}
                            onClick={() => { setActiveTab('navItems'); setIsMobileMenuOpen(false); }}
                            icon={<LayoutDashboard />}
                            label="Navigation"
                        />
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <Button variant="ghost" onClick={() => setIsAuthenticated(false)} className="w-full justify-start text-white/60 hover:text-white">
                            <LogOut className="w-4 h-4 mr-2" /> Logout
                        </Button>
                    </div>
                </GlassCard>
            </aside>

            {/* Main Content Column */}
            <main className="flex-1 h-full overflow-y-auto p-4 lg:p-8 no-scrollbar w-full">
                {/* Mobile Header */}
                <header className="flex md:hidden items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </Button>
                        <span className="font-bold text-lg">Admin</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsAuthenticated(false)}>
                        <LogOut className="w-5 h-5" />
                    </Button>
                </header>

                {/* Top Action Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {activeTab === 'general_branding' && "General Settings"}
                            {activeTab === 'hero' && "Hero Section"}
                            {activeTab === 'about' && "About Me"}
                            {activeTab === 'projects' && "Projects"}
                            {activeTab === 'experience' && "Experience"}
                            {activeTab === 'skills' && "Skills"}
                            {activeTab === 'techMarquee' && "Tech Marquee"}
                            {activeTab === 'footer' && "Footer Content"}
                            {activeTab === 'navItems' && "Navigation Menu"}
                        </h2>
                        <p className="text-white/60 text-sm">Manage your site content in real-time</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {feedback && (
                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`text-sm font-medium px-3 py-1 rounded-full bg-white/5 border ${feedback.type === 'error' ? 'text-red-400 border-red-500/20' : 'text-green-400 border-green-500/20'}`}
                            >
                                {feedback.message}
                            </motion.span>
                        )}
                        <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 h-10 px-6">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="max-w-6xl"
                    >
                        {activeTab === 'general_branding' && (
                            <GeneralEditor
                                general={data.general}
                                onChange={(newGen) => setData({ ...data, general: newGen })}
                            />
                        )}
                        {activeTab === 'hero' && (
                            <HeroEditor
                                hero={data.hero}
                                onChange={(newHero) => setData({ ...data, hero: newHero })}
                            />
                        )}
                        {activeTab === 'about' && (
                            <AboutEditor
                                about={data.about}
                                onChange={(newAbout) => setData({ ...data, about: newAbout })}
                            />
                        )}
                        {activeTab === 'projects' && (
                            <ProjectEditor
                                projects={data.projects}
                                onChange={(newProjects) => setData({ ...data, projects: newProjects })}
                            />
                        )}
                        {activeTab === 'experience' && (
                            <ExperienceEditor
                                experience={data.experience}
                                onChange={(newExp) => setData({ ...data, experience: newExp })}
                            />
                        )}
                        {activeTab === 'skills' && (
                            <SkillsEditor
                                skills={data.skills}
                                onChange={(newSkills) => setData({ ...data, skills: newSkills })}
                            />
                        )}
                        {activeTab === 'techMarquee' && (
                            <MarqueeEditor
                                marquee={data.techMarquee}
                                onChange={(newMarq) => setData({ ...data, techMarquee: newMarq })}
                            />
                        )}
                        {activeTab === 'footer' && (
                            <FooterEditor
                                footer={data.footer}
                                onChange={(newFooter) => setData({ ...data, footer: newFooter })}
                            />
                        )}
                        {activeTab === 'navItems' && (
                            <NavEditor
                                navItems={data.navItems}
                                onChange={(newNav) => setData({ ...data, navItems: newNav })}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

// --- Sub-Components ---

const TabButton = ({ active, onClick, icon, label }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
            ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
            : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
    >
        {React.cloneElement(icon, { size: 18 })}
        <span className="font-medium">{label}</span>
    </button>
);

const GeneralEditor = ({ general, onChange }: { general: General, onChange: (g: General) => void }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Brand Identity">
                <div className="space-y-4">
                    <Input
                        label="Brand Name"
                        value={general.brandName}
                        onChange={(v: string) => onChange({ ...general, brandName: v })}
                        placeholder="e.g. Luffycpp."
                    />
                    <Input
                        label="Logo Image Path"
                        value={general.logo}
                        onChange={(v: string) => onChange({ ...general, logo: v })}
                        placeholder="/logo.png"
                    />
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={general.logo} alt="Logo Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-white">Logo Preview</p>
                            <p className="text-white/40 text-xs">Based on path</p>
                        </div>
                    </div>
                </div>
            </SectionCard>
            <SectionCard title="Navigation & Loading">
                <div className="space-y-4">
                    <Input
                        label="Preloader Text"
                        value={general.preloaderText}
                        onChange={(v: string) => onChange({ ...general, preloaderText: v })}
                        placeholder="Loading text..."
                    />
                    <Input
                        label="Navbar CTA Button"
                        value={general.navCta}
                        onChange={(v: string) => onChange({ ...general, navCta: v })}
                        placeholder="e.g. Let's Talk"
                    />
                </div>
            </SectionCard>
        </div>
    );
};

const HeroEditor = ({ hero, onChange }: { hero: Hero, onChange: (h: Hero) => void }) => {
    return (
        <div className="space-y-6">
            <SectionCard title="Hero Content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <Input
                            label="Title Words (comma separated)"
                            value={hero?.titleWords?.join(", ") || ""}
                            onChange={(v: string) => onChange({ ...hero, titleWords: v.split(",").map(s => s.trim()) })}
                            placeholder="Word1, Word2, Word3"
                        />
                        <TextArea
                            label="Description"
                            value={hero.description}
                            onChange={(v: string) => onChange({ ...hero, description: v })}
                        />
                    </div>
                    <div className="space-y-6">
                        <Input
                            label="Page ID"
                            value={hero.id}
                            onChange={(v: string) => onChange({ ...hero, id: v })}
                        />
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <h4 className="text-blue-400 font-medium mb-2 text-sm">Preview</h4>
                            <div className="text-3xl font-bold leading-tight mb-2">
                                {hero?.titleWords?.map((word, i) => (
                                    <span key={i} className="block text-white/50">{word}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SectionCard title="Primary CTA">
                    <div className="space-y-4">
                        <Input
                            label="Button Text"
                            value={hero.primaryCta.text}
                            onChange={(v: string) => onChange({ ...hero, primaryCta: { ...hero.primaryCta, text: v } })}
                        />
                        <Input
                            label="Link Target"
                            value={hero.primaryCta.link}
                            onChange={(v: string) => onChange({ ...hero, primaryCta: { ...hero.primaryCta, link: v } })}
                        />
                    </div>
                </SectionCard>
                <SectionCard title="Secondary CTA">
                    <div className="space-y-4">
                        <Input
                            label="Link Text"
                            value={hero.secondaryCta.text}
                            onChange={(v: string) => onChange({ ...hero, secondaryCta: { ...hero.secondaryCta, text: v } })}
                        />
                        <Input
                            label="Link Target"
                            value={hero.secondaryCta.link}
                            onChange={(v: string) => onChange({ ...hero, secondaryCta: { ...hero.secondaryCta, link: v } })}
                        />
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

const AboutEditor = ({ about, onChange }: { about: About, onChange: (a: About) => void }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
                <SectionCard title="Profile Image">
                    <div className="space-y-4">
                        <div className="aspect-square relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={about.image} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <Input
                            label="Image Path"
                            value={about.image}
                            onChange={(v: string) => onChange({ ...about, image: v })}
                        />
                    </div>
                </SectionCard>
                <SectionCard title="Details">
                    <Input
                        label="Location"
                        value={about.location}
                        onChange={(v: string) => onChange({ ...about, location: v })}
                    />
                </SectionCard>
            </div>

            <div className="md:col-span-2">
                <SectionCard title="Bio Content" className="h-full">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Headline Line 1"
                                value={about.titleLine1}
                                onChange={(v: string) => onChange({ ...about, titleLine1: v })}
                            />
                            <Input
                                label="Headline Line 2"
                                value={about.titleLine2}
                                onChange={(v: string) => onChange({ ...about, titleLine2: v })}
                            />
                        </div>
                        <TextArea
                            label="Full Biography"
                            value={about.description}
                            onChange={(v: string) => onChange({ ...about, description: v })}
                        />
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

const ProjectEditor = ({ projects, onChange }: { projects: Project[], onChange: (p: Project[]) => void }) => {
    const addProject = () => {
        const newProject: Project = {
            id: Date.now(),
            title: "New Project",
            description: "Description...",
            tags: ["New"],
            link: "#",
            year: new Date().getFullYear().toString()
        };
        onChange([newProject, ...projects]);
    };

    const updateProject = (index: number, field: keyof Project, value: any) => {
        const newProjects = [...projects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        onChange(newProjects);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Projects</h2>
                <Button onClick={addProject} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <SectionCard key={project.id || index} className="relative group">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onChange(projects.filter((_, i) => i !== index))}
                                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <Input
                                label="Project Title"
                                value={project.title}
                                onChange={(v: string) => updateProject(index, 'title', v)}
                            />
                            <TextArea
                                label="Description"
                                value={project.description}
                                onChange={(v: string) => updateProject(index, 'description', v)}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Link"
                                    value={project.link}
                                    onChange={(v: string) => updateProject(index, 'link', v)}
                                />
                                <Input
                                    label="Year"
                                    value={project.year}
                                    onChange={(v: string) => updateProject(index, 'year', v)}
                                />
                            </div>
                            <Input
                                label="Tags (comma separated)"
                                value={project.tags.join(", ")}
                                onChange={(v: string) => updateProject(index, 'tags', v.split(",").map(s => s.trim()))}
                            />
                        </div>
                    </SectionCard>
                ))}
            </div>
        </div>
    );
};

const ExperienceEditor = ({ experience, onChange }: { experience: Experience[], onChange: (e: Experience[]) => void }) => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Experience</h2>
                <Button onClick={() => onChange([{ role: "Role", company: "Company", year: "2024", description: "Desc", skills: ["Skill"] }, ...experience])} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" /> Add Role
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {experience.map((exp, index) => (
                    <SectionCard key={index} className="relative group">
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onChange(experience.filter((_, i) => i !== index))}
                                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Input label="Role Title" value={exp.role} onChange={(v: string) => {
                                    const n = [...experience]; n[index].role = v; onChange(n);
                                }} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Company" value={exp.company} onChange={(v: string) => {
                                        const n = [...experience]; n[index].company = v; onChange(n);
                                    }} />
                                    <Input label="Year" value={exp.year} onChange={(v: string) => {
                                        const n = [...experience]; n[index].year = v; onChange(n);
                                    }} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <TextArea label="Description" value={exp.description} onChange={(v: string) => {
                                    const n = [...experience]; n[index].description = v; onChange(n);
                                }} />
                                <Input label="Skills" value={exp.skills.join(", ")} onChange={(v: string) => {
                                    const n = [...experience]; n[index].skills = v.split(",").map(s => s.trim()); onChange(n);
                                }} />
                            </div>
                        </div>
                    </SectionCard>
                ))}
            </div>
        </div>
    );
};

const SkillsEditor = ({ skills, onChange }: { skills: Skill[], onChange: (s: Skill[]) => void }) => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Skills</h2>
                <Button onClick={() => onChange([...skills, { name: "New Skill", url: "#" }])} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" /> Add Skill
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                    <div key={index} className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all">
                        <div className="space-y-3">
                            <Input
                                label="Skill Name"
                                value={skill.name}
                                onChange={(v: string) => {
                                    const newSkills = [...skills];
                                    newSkills[index] = { ...newSkills[index], name: v };
                                    onChange(newSkills);
                                }}
                                placeholder="Name"
                            />
                            <Input
                                label="Doc URL"
                                value={skill.url}
                                onChange={(v: string) => {
                                    const newSkills = [...skills];
                                    newSkills[index] = { ...newSkills[index], url: v };
                                    onChange(newSkills);
                                }}
                                placeholder="https://..."
                            />
                        </div>
                        <button
                            onClick={() => onChange(skills.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/40"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MarqueeEditor = ({ marquee, onChange }: { marquee: string[], onChange: (m: string[]) => void }) => {
    return (
        <SectionCard title="Tech Marquee">
            <div className="space-y-4">
                <TextArea
                    label="Technologies (Comma separated)"
                    value={marquee.join(", ")}
                    onChange={(v: string) => onChange(v.split(",").map(s => s.trim()).filter(s => s.length > 0))}
                    placeholder="React, Next.js, TypeScript..."
                />
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 overflow-hidden">
                    <div className="flex gap-4 opacity-50 overflow-x-auto pb-2">
                        {marquee.map((m, i) => (
                            <span key={i} className="text-xl font-bold whitespace-nowrap">{m}</span>
                        ))}
                    </div>
                </div>
            </div>
        </SectionCard>
    );
};

const FooterEditor = ({ footer, onChange }: { footer: Footer, onChange: (f: Footer) => void }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <SectionCard title="Contact Section">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <Input
                            label="CTA Line 1"
                            value={footer.ctaLine1}
                            onChange={(v: string) => onChange({ ...footer, ctaLine1: v })}
                        />
                        <Input
                            label="CTA Line 2"
                            value={footer.ctaLine2}
                            onChange={(v: string) => onChange({ ...footer, ctaLine2: v })}
                        />
                    </div>
                    <Input
                        label="Email Address"
                        value={footer.email}
                        onChange={(v: string) => onChange({ ...footer, email: v })}
                    />
                </SectionCard>
                <SectionCard title="Copyright">
                    <Input
                        label="Copyright Name"
                        value={footer.copyrightName}
                        onChange={(v: string) => onChange({ ...footer, copyrightName: v })}
                    />
                </SectionCard>
            </div>

            <div className="lg:col-span-1">
                <SectionCard title="Social Links" className="h-full">
                    <div className="space-y-4">
                        {footer.socials.map((social, index) => (
                            <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2 relative group">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-semibold text-white/40 uppercase">Social {index + 1}</span>
                                    <button
                                        onClick={() => onChange({ ...footer, socials: footer.socials.filter((_, i) => i !== index) })}
                                        className="text-red-400 opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                                <Input value={social.name} onChange={(v: string) => {
                                    const newSocials = [...footer.socials];
                                    newSocials[index] = { ...newSocials[index], name: v };
                                    onChange({ ...footer, socials: newSocials });
                                }} placeholder="Platform" />
                                <Input value={social.link} onChange={(v: string) => {
                                    const newSocials = [...footer.socials];
                                    newSocials[index] = { ...newSocials[index], link: v };
                                    onChange({ ...footer, socials: newSocials });
                                }} placeholder="URL" />
                            </div>
                        ))}
                        <Button onClick={() => onChange({ ...footer, socials: [...footer.socials, { name: "", link: "" }] })} className="w-full" variant="secondary">
                            <Plus className="w-4 h-4 mr-2" /> Add Social
                        </Button>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

const NavEditor = ({ navItems, onChange }: { navItems: NavItem[], onChange: (n: NavItem[]) => void }) => {
    return (
        <SectionCard title="Navigation Items">
            <div className="grid grid-cols-2 gap-4">
                {navItems.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <Input label="Display Name" value={item.name} onChange={(v: string) => {
                            const newItems = [...navItems];
                            newItems[index] = { ...newItems[index], name: v };
                            onChange(newItems);
                        }} />
                        <Input label="Target Link" value={item.link} onChange={(v: string) => {
                            const newItems = [...navItems];
                            newItems[index] = { ...newItems[index], link: v };
                            onChange(newItems);
                        }} />
                    </div>
                ))}
            </div>
        </SectionCard>
    );
};
