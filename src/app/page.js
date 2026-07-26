"use client";

import React, { useState, useEffect } from 'react';

import CanvasBackground from '@/components/layout/CanvasBackground';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollSpy from '@/components/ui/ScrollSpy';
import TechMarquee from '@/components/ui/TechMarquee';

import Hero from '@/components/sections/Hero';
import Research from '@/components/sections/Research';
import Experience from '@/components/sections/Experience';
import Curriculum from '@/components/sections/Curriculum';
import Publications from '@/components/sections/Publications';
import Contact from '@/components/sections/Contact';

export default function PortfolioApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(true);

  const [particleSpeed, setParticleSpeed] = useState(50);
  const [particleDensity, setParticleDensity] = useState(50);
  const [particleSize, setParticleSize] = useState(50);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div 
      className={`relative min-h-screen transition-colors duration-500 overflow-x-hidden flex flex-col ${
        isDarkMode ? 'bg-[#090D16] text-slate-100' : 'bg-[#fafafa] text-gray-900'
      }`} 
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <CanvasBackground 
        isParticlesEnabled={isParticlesEnabled} 
        isDarkMode={isDarkMode} 
        particleSpeed={particleSpeed}
        particleDensity={particleDensity}
        particleSize={particleSize}
      />
      
      <ScrollSpy isDarkMode={isDarkMode} />
      
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        isParticlesEnabled={isParticlesEnabled} 
        setIsParticlesEnabled={setIsParticlesEnabled} 
        particleSpeed={particleSpeed}
        setParticleSpeed={setParticleSpeed}
        particleDensity={particleDensity}
        setParticleDensity={setParticleDensity}
        particleSize={particleSize}
        setParticleSize={setParticleSize}
      />

      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Hero isDarkMode={isDarkMode} />
        <TechMarquee isDarkMode={isDarkMode} />
        <Research isDarkMode={isDarkMode} />
        <Experience isDarkMode={isDarkMode} />
        <Curriculum isDarkMode={isDarkMode} />
        <Publications isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </div>

      <Footer 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        isParticlesEnabled={isParticlesEnabled} 
        setIsParticlesEnabled={setIsParticlesEnabled} 
      />
    </div>
  );
}