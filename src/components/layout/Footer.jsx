"use client";

import React from 'react';
import styled from '@emotion/styled';

// ==========================================
// 1. STYLES DE LA STRUCTURE GLOBALE
// ==========================================
const FooterContainer = styled.footer`
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 4rem 2rem 3rem;
  margin-top: auto;
  font-family: 'IBM Plex Sans', sans-serif;
  transition: all 500ms;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#060910' : '#ffffff')};
  border-top: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#0f172a' : 'rgba(229,231,235,0.6)')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#94a3b8' : '#6b7280')};
`;

const FooterGrid = styled.div`
  max-width: 950px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 2rem;
  }
`;

// ==========================================
// 2. TYPOGRAPHIE ET LIENS
// ==========================================
const BrandTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  font-family: 'Luxora Grotesk', 'Outfit', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#f1f5f9' : '#111827')};
`;

const BrandDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  font-weight: 300;
  margin: 0 0 1rem 0;
  font-family: 'Labrado B', 'Labrado', 'Manrope', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#94a3b8' : '#6b7280')};
  max-width: 90%;
`;

const CopyrightText = styled.span`
  font-size: 10px;
  font-family: 'IBM Plex Mono', monospace;
  color: #9ca3af;
`;

const FooterHeading = styled.h4`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'IBM Plex Mono', monospace;
  margin: 0 0 1rem 0;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
`;

const FooterLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#94a3b8' : '#6b7280')};
  text-decoration: none;
  transition: color 300ms ease;
  cursor: pointer;

  &:hover {
    color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  }
`;

// ==========================================
// 3. STYLES DES TOGGLES (Mini Switch)
// ==========================================
const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MiniToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  
  /* L'interaction s'applique sur tout le conteneur au survol */
  &:hover > div {
    border-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(129,140,248,0.6)' : 'rgba(36,59,181,0.4)')};
  }
`;

const ToggleLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'IBM Plex Mono', monospace;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#cbd5e1' : '#4b5563')};
`;

const MiniToggleTrack = styled.div`
  width: 2.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center; /* Centre le point verticalement à la perfection */
  padding: 2px;
  box-sizing: border-box;
  transition: background-color 300ms, border-color 300ms;
  
  border: 1px solid ${({ $isActive, $isDarkMode }) => {
    if (!$isActive) return $isDarkMode ? 'rgba(51,65,85,1)' : 'rgba(209,213,219,1)';
    return $isDarkMode ? 'rgba(129,140,248,0.3)' : 'rgba(36,59,181,0.2)';
  }};

  background-color: ${({ $isActive, $isDarkMode }) => {
    if (!$isActive) return $isDarkMode ? 'rgba(15,23,42,0.8)' : '#f3f4f6';
    return $isDarkMode ? '#4f46e5' : '#243bb5';
  }};
`;

const MiniToggleThumb = styled.div`
  width: 0.875rem;
  height: 0.875rem;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isActive }) => ($isActive ? 'translateX(1rem)' : 'translateX(0)')};
`;

// ==========================================
// 4. COMPOSANT PRINCIPAL
// ==========================================
export default function Footer({ isDarkMode, setIsDarkMode, isParticlesEnabled, setIsParticlesEnabled }) {
  return (
    <FooterContainer $isDarkMode={isDarkMode}>
      <FooterGrid>
        
        {/* Colonne 1: Branding & Description */}
        <div>
          <BrandTitle $isDarkMode={isDarkMode}>
            Aghiles Kebaili
          </BrandTitle>
          <BrandDescription $isDarkMode={isDarkMode}>
            Machine Learning Research Engineer in Medical Imaging. Specialized in generative models & deep radiomics.
          </BrandDescription>
          <CopyrightText>
            © 2026 — All Rights Reserved.
          </CopyrightText>
        </div>

        {/* Colonne 2: Navigation rapide */}
        <div>
          <FooterHeading $isDarkMode={isDarkMode}>Navigation</FooterHeading>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            {['Research', 'Experience', 'Curriculum', 'Publications', 'Contact'].map((item) => (
              <FooterLink key={item} href={`#${item.toLowerCase()}`} $isDarkMode={isDarkMode}>
                {item}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Colonne 3: Réseaux Sociaux & Contrôles d'interface */}
        <div>
          <FooterHeading $isDarkMode={isDarkMode}>Connect & Controls</FooterHeading>
          
          <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <FooterLink href="https://linkedin.com/in/aghiles-kebaili" target="_blank" $isDarkMode={isDarkMode}>LinkedIn</FooterLink>
            <FooterLink href="https://github.com/Arksyd96" target="_blank" $isDarkMode={isDarkMode}>GitHub</FooterLink>
            <FooterLink href="https://scholar.google.fr/citations?user=Sp3Q6LQAAAAJ&hl=fr" target="_blank" $isDarkMode={isDarkMode}>Scholar</FooterLink>
          </div>

          <ControlsContainer>
            {/* Bouton Toggle : Nightly Mode */}
            <MiniToggleContainer 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              $isDarkMode={isDarkMode}
            >
              <MiniToggleTrack $isActive={isDarkMode} $isDarkMode={isDarkMode}>
                <MiniToggleThumb $isActive={isDarkMode} />
              </MiniToggleTrack>
              <ToggleLabel $isDarkMode={isDarkMode}>
                Nightly Mode
              </ToggleLabel>
            </MiniToggleContainer>

            {/* Bouton Toggle : Particles */}
            <MiniToggleContainer 
              onClick={() => setIsParticlesEnabled(!isParticlesEnabled)} 
              $isDarkMode={isDarkMode}
            >
              <MiniToggleTrack $isActive={isParticlesEnabled} $isDarkMode={isDarkMode}>
                <MiniToggleThumb $isActive={isParticlesEnabled} />
              </MiniToggleTrack>
              <ToggleLabel $isDarkMode={isDarkMode}>
                Network Particles
              </ToggleLabel>
            </MiniToggleContainer>
          </ControlsContainer>
        </div>

      </FooterGrid>
    </FooterContainer>
  );
}