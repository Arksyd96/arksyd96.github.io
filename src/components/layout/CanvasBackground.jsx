"use client";

import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const NoiseFilter = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
`;

const RadialHalo = styled.div`
  position: fixed;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
  transition: all 1000ms ease-in-out;
  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'radial-gradient(circle at center, rgba(99,102,241,0.03) 0%, rgba(9,13,22,0) 70%)'
      : 'radial-gradient(circle at center, rgba(36,59,181,0.04) 0%, rgba(250,250,250,0) 70%)'};
`;

const StyledCanvas = styled.canvas`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

export default function CanvasBackground({ 
  isParticlesEnabled, 
  isDarkMode, 
  particleSpeed = 50, 
  particleDensity = 50, 
  particleSize = 50 
}) {
  const canvasRef = useRef(null);

  const speedRef = useRef(particleSpeed);
  const densityRef = useRef(particleDensity);
  const sizeRef = useRef(particleSize);

  useEffect(() => {
    speedRef.current = particleSpeed;
    densityRef.current = particleDensity;
    sizeRef.current = particleSize;
  }, [particleSpeed, particleDensity, particleSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        const baseAngle = Math.random() * Math.PI * 2;
        const baseSpeed = Math.random() * 0.5 + 0.1;
        this.vx = Math.cos(baseAngle) * baseSpeed;
        this.vy = Math.sin(baseAngle) * baseSpeed;
        this.baseRadius = Math.random() * 2 + 1;
      }
      update() {
        const speedFactor = (speedRef.current / 50);
        this.x += this.vx * speedFactor;
        this.y += this.vy * speedFactor;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * -2;
            this.y += (dy / distance) * force * -2;
          }
        }
      }
      draw() {
        ctx.beginPath();
        const currentRadius = this.baseRadius * (sizeRef.current / 50);
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? 'rgba(165, 180, 252, 0.4)' : 'rgba(150, 150, 150, 0.4)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const densityFactor = densityRef.current / 50;
      const numberOfParticles = ((canvas.width * canvas.height) / 8000) * densityFactor;
      for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
    };

    const updateParticleCount = () => {
      const densityFactor = densityRef.current / 50;
      const targetCount = Math.floor(((canvas.width * canvas.height) / 8000) * densityFactor);
      
      while (particles.length < targetCount) {
        particles.push(new Particle());
      }
      while (particles.length > targetCount) {
        particles.pop();
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode
              ? `rgba(99, 102, 241, ${(1 - distance / 150) * 0.25})`
              : `rgba(36, 59, 181, ${(1 - distance / 150) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        if (mouse.x != null && mouse.y != null) {
          let mouseDist = Math.hypot(particles[a].x - mouse.x, particles[a].y - mouse.y);
          if (mouseDist < 180) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode
              ? `rgba(129, 140, 248, ${(1 - mouseDist / 180) * 0.7})`
              : `rgba(138, 180, 255, ${(1 - mouseDist / 180) * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticleCount();
      if (isParticlesEnabled) {
        particles.forEach((p) => {
          p.update();
          p.draw();
        });
        connectParticles();
        if (mouse.x != null && mouse.y != null) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode ? 'rgba(129, 140, 248, 0.9)' : 'rgba(138, 180, 255, 0.9)';
          ctx.shadowBlur = 15;
          ctx.shadowColor = isDarkMode ? 'rgba(129, 140, 248, 1)' : 'rgba(138, 180, 255, 1)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      animationFrameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    initParticles();
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isParticlesEnabled, isDarkMode]);

  return (
    <>
      <NoiseFilter />
      <StyledCanvas ref={canvasRef} />
      <RadialHalo isDarkMode={isDarkMode} />
    </>
  );
}