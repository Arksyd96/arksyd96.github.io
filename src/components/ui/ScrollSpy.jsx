"use client";

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const SpyContainer = styled.div`
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: none;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 1280px) { display: flex; }
`;

const SpyLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  &:hover .spy-tooltip {
    opacity: 1;
  }
`;

const SpyTooltip = styled.span`
  position: absolute;
  right: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 9px;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 300ms;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#1e293b' : '#ffffff')};
  color: ${({ isDarkMode }) => (isDarkMode ? '#cbd5e1' : '#6b7280')};
  border: ${({ isDarkMode }) => (isDarkMode ? 'none' : '1px solid #f3f4f6')};
`;

const SpyDot = styled.div`
  width: 0.375rem;
  border-radius: 9999px;
  transition: all 300ms;
  height: ${({ isActive }) => (isActive ? '1.5rem' : '0.375rem')};
  background-color: ${({ isActive, isDarkMode }) => {
    if (isActive) return isDarkMode ? '#6366f1' : '#243bb5';
    return isDarkMode ? '#334155' : '#d1d5db';
  }};

  /* CORRECTION ICI : On utilise une classe CSS standard .spy-link */
  .spy-link:hover & {
    background-color: ${({ isActive, isDarkMode }) => {
      if (isActive) return isDarkMode ? '#6366f1' : '#243bb5';
      return isDarkMode ? '#64748b' : '#9ca3af';
    }};
  }
`;

export default function ScrollSpy({ isDarkMode }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.3 });

    ['hero','research', 'experience', 'curriculum', 'publications', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <SpyContainer>
      {['hero', 'research', 'experience', 'curriculum', 'publications', 'contact'].map(id => (
        <SpyLink key={id} href={`#${id}`} className="spy-link" aria-label={`Go to ${id}`}>
          <SpyTooltip className="spy-tooltip" isDarkMode={isDarkMode}>
            {id}
          </SpyTooltip>
          <SpyDot isActive={activeSection === id} isDarkMode={isDarkMode} />
        </SpyLink>
      ))}
    </SpyContainer>
  );
}