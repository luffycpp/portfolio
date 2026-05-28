"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { TechMarquee } from "@/components/TechMarquee";
import { Section } from "@/components/ui/Section";
import { Preloader } from "@/components/Preloader";
import { Terminal } from "@/components/Terminal";
import { GitHubHeatmap } from "@/components/GitHubHeatmap";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen relative overflow-hidden bg-transparent text-white selection:bg-white/20">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="animate-in fade-in duration-1000">
          <Navbar />
          <Terminal />

          <Section id="home">
            <Hero />
          </Section>

          <Section>
            <div className="max-w-7xl mx-auto px-4 mb-16">
              <GitHubHeatmap />
            </div>
            <TechMarquee />
          </Section>

          <Section id="about">
            <About />
          </Section>

          <Section id="projects">
            <Projects />
          </Section>

          <Section id="contact">
            <Footer />
          </Section>
        </div>
      )}
    </main>
  );
}
