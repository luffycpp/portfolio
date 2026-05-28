"use client";

import { memo } from "react";
import { GitHubCalendar } from "react-github-calendar";

export const GitHubHeatmap = memo(() => {
    return (
        <div className="w-full p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Code Activity</h3>
                    <p className="text-sm text-white/40 font-mono">github.com/luffycpp</p>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Live Sync</span>
                </div>
            </div>

            <div className="flex justify-center overflow-x-auto scrollbar-hide py-4">
                <GitHubCalendar 
                    username="luffycpp"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    theme={{
                        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    loading={false}
                />
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-[10px] font-mono text-white/30 uppercase tracking-tighter">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-[#0e4429]" /> Low</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-[#39d353]" /> High Activity</span>
            </div>
        </div>
    );
});

GitHubHeatmap.displayName = "GitHubHeatmap";
