"use client"

import { Cpu, Cloud, Zap, Wrench, Hammer, Settings, Github, ExternalLink } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-indigo-950/20 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/10 via-black to-purple-950/10"></div>
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-indigo-400/30 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-purple-400/25 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-0.5 h-0.5 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '5s' }}></div>
      </div>

      {/* Animated hexagon particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating hexagons */}
        <div className="absolute top-20 left-20 animate-[float_8s_ease-in-out_infinite]">
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-purple-400/10">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="absolute top-40 right-32 animate-[float_6s_ease-in-out_infinite_reverse]" style={{ animationDelay: '2s' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" className="text-blue-400/15">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="absolute bottom-32 left-40 animate-[float_10s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-indigo-400/12">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/4 animate-[float_7s_ease-in-out_infinite_reverse]" style={{ animationDelay: '1s' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" className="text-purple-300/8">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="absolute bottom-20 right-20 animate-[float_9s_ease-in-out_infinite]" style={{ animationDelay: '3s' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" className="text-blue-300/10">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="absolute top-1/3 right-1/4 animate-[float_5s_ease-in-out_infinite_reverse]" style={{ animationDelay: '6s' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" className="text-purple-400/12">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Medium hexagons */}
        <div className="absolute top-60 left-1/2 animate-[float_12s_ease-in-out_infinite]" style={{ animationDelay: '2.5s' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" className="text-indigo-300/15">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute bottom-40 left-1/3 animate-[float_8s_ease-in-out_infinite_reverse]" style={{ animationDelay: '5s' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" className="text-blue-400/20">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" />
          </svg>
        </div>

        {/* Small hexagons */}
        <div className="absolute top-1/4 right-1/3 animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '7s' }}>
          <svg width="8" height="8" viewBox="0 0 24 24" className="text-purple-300/25">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute bottom-1/4 right-1/2 animate-[float_10s_ease-in-out_infinite_reverse]" style={{ animationDelay: '8s' }}>
          <svg width="6" height="6" viewBox="0 0 24 24" className="text-indigo-400/30">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="currentColor" />
          </svg>
        </div>
      </div>
      
      {/* Main container with proper spacing */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main content - centered */}
        <main className="flex-1 flex items-center justify-center px-8 py-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            
            {/* Logo/Brand - now centered with content */}
            <div className="flex items-center justify-center gap-3 mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
              <span className="text-white font-semibold text-lg">Quickfra</span>
            </div>

            {/* Builder Animation */}
            <div className="relative mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center animate-pulse shadow-lg">
                    <Hammer className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-bounce shadow-sm"></div>
                </div>
                <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}>
                  <Wrench className="w-6 h-6 text-blue-400" />
                </div>
                <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center animate-pulse shadow-lg" style={{ animationDelay: '1s' }}>
                  <Settings className="w-6 h-6 text-green-400 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Under Construction
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
            </div>

            {/* Main headline */}
            <div className="space-y-4 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                Deploy without friction
              </h2>
              <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Multi-cloud infrastructure deployment made simple. Coming soon.
              </p>
            </div>

            {/* Status card */}
            <div className="max-w-sm mx-auto opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
              <div className="bg-neutral-900/60 backdrop-blur-md border border-neutral-800/50 rounded-xl p-6 shadow-2xl shadow-purple-900/10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-[pulse_2s_ease-in-out_infinite] shadow-lg shadow-purple-400/50"></div>
                  <span className="text-neutral-300 font-medium text-sm">In Development</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-neutral-400 text-xs">
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Multi-cloud support</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400 text-xs">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Infrastructure automation</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400 text-xs">
                    <Zap className="w-3.5 h-3.5" />
                    <span>One-click deployment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Links */}
            <div className="space-y-3 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
              <p className="text-neutral-400 text-sm">Check out the progress here:</p>
              <div className="flex items-center justify-center gap-4">
                <a 
                  href="https://github.com/quickfra/quickfra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-300 hover:text-white transition-all duration-300 text-sm group hover:scale-105"
                >
                  <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
                <a 
                  href="https://bsky.app/profile/quickfra.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-300 hover:text-white transition-all duration-300 text-sm group hover:scale-105"
                >
                  <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center group-hover:bg-blue-400 transition-colors duration-300 group-hover:rotate-12">
                    <span className="text-white text-xs font-bold">B</span>
                  </div>
                  <span>Bluesky</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="w-full px-8 py-4 opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-neutral-600 text-xs font-light">
              Building the future of infrastructure deployment
            </p>
          </div>
        </footer>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) translateX(-5px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) translateX(-10px) rotate(270deg);
          }
        }
      `}</style>
    </div>
  );
}