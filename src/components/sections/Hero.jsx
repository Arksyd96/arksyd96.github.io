"use client";

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import MagneticWrapper from '../ui/MagneticWrapper';

const HeroSection = styled.main`
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 2rem 5rem;
  pointer-events: none;
  box-sizing: border-box;
  
  @media (min-width: 768px) { padding: 8rem 4rem 5rem; }
  @media (min-width: 1024px) { padding: 8rem 6rem 5rem; }
  @media (min-width: 1280px) { padding: 8rem 8rem 5rem; }
`;

const ContentWrapper = styled.div`
  max-width: 48rem;
  pointer-events: auto;
  box-sizing: border-box;
  font-family: 'Manrope', sans-serif;
  font-weight: 300;
`;

const AnimatedElement = styled.div`
  transition: all 1000ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: ${(props) => props.delay}ms;
  transform: ${(props) => (props.$isLoaded ? 'translateY(0)' : 'translateY(2rem)')};
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
`;

const Subtitle = styled.h2`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  color: #6b7280;

  @media (min-width: 768px) { font-size: 1.25rem; }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 300;
  letter-spacing: -0.025em;
  margin-bottom: 1.25rem;
  font-family: 'Outfit', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#111827')};

  @media (min-width: 768px) { font-size: 3rem; }
  @media (min-width: 1024px) { font-size: 3.2rem; }
`;

const Description = styled.p`
  font-size: 0.875rem;
  line-height: 1.625;
  margin-bottom: 2rem;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#cbd5e1' : '#4b5563')};

  @media (min-width: 768px) { font-size: 1rem; }
`;

// NOUVEAU: Liens animés avec slide et séparateur
const AnimatedLink = styled.a`
  position: relative;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1.5px;
    bottom: 0;
    left: 0;
    background-color: currentColor;
    transform-origin: bottom right;
    transition: transform 300ms cubic-bezier(0.65, 0, 0.35, 1);
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const DotSeparator = styled.span`
  margin: 0 0.4rem;
  font-size: 0.8em;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#475569' : '#9ca3af')};
`;

// MISE À JOUR: Container agrandi pour éviter de couper le texte
const TagContainer = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 310px;
  height: 2em; /* Augmenté pour laisser respirer le bas des lettres */
  margin-left: 0.375rem;
  overflow: hidden;
  vertical-align: middle;
`;

// MISE À JOUR: Texte plus gros, animation "Téléportation" plus vive
const Tag = styled.span`
  position: absolute;
  left: 0;
  font-weight: 600;
  font-size: 1.1em; /* Texte agrandi */
  white-space: nowrap;
  
  /* Courbe Expo-Out très nette, durée réduite à 500ms */
  transition: all 500ms cubic-bezier(0.16, 1, 0.3, 1);
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  
  transform: ${({ $status }) => {
    if ($status === 'current') return 'translateY(0) scale(1)';
    if ($status === 'previous') return 'translateY(-100%) scale(1.05)';
    return 'translateY(100%) scale(0.95)';
  }};
  opacity: ${({ $status }) => ($status === 'current' ? 1 : 0)};
  filter: ${({ $status }) => ($status === 'current' ? 'blur(0)' : 'blur(4px)')};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const ButtonPrimary = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 300ms;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#4f46e5' : '#243bb5')};

  &:hover {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#6366f1' : '#1d2f91')};
    box-shadow: ${({ $isDarkMode }) => 
      $isDarkMode 
        ? '0 8px 20px -4px rgba(99,102,241,0.4)' 
        : '0 8px 20px -4px rgba(36,59,181,0.4)'};
  }

  & svg {
    width: 1rem;
    height: 1rem;
    transition: transform 300ms;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const ButtonOutline = styled.a`
  display: inline-block;
  padding: 0.75rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  border-radius: 0.5rem;
  transition: all 300ms;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#1e293b' : '#e5e7eb')};
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.6)')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#cbd5e1' : '#4b5563')};

  &:hover {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#0f172a' : '#ffffff')};
    color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
    border-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(129,140,248,0.5)' : 'rgba(36,59,181,0.5)')};
    box-shadow: ${({ $isDarkMode }) => 
      $isDarkMode 
        ? 'none' 
        : '0 8px 20px -4px rgba(36,59,181,0.15)'};
  }
`;

export default function Hero({ isDarkMode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  
  const tags = [
    "Computer Vision",
    "Medical Imaging",
    "Generative Modeling",
    "PET and MRI Imaging"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTagIndex((prevIndex) => (prevIndex + 1) % tags.length);
    }, 3500);
    return () => clearInterval(intervalId);
  }, [tags.length]);

  return (
    <HeroSection id="hero">
      <ContentWrapper>
        <AnimatedElement $isLoaded={isLoaded} delay={100}>
          <Subtitle>Hey, I'm</Subtitle>
        </AnimatedElement>

        <AnimatedElement $isLoaded={isLoaded} delay={200}>
          <Title $isDarkMode={isDarkMode}>Aghiles Kebaili</Title>
        </AnimatedElement>

        <AnimatedElement $isLoaded={isLoaded} delay={300}>
          <Description $isDarkMode={isDarkMode}>
            I'm a machine learning and artificial intelligence research engineer specialized in deep learning and computer vision models applied to medical imaging. Currently working on a federated medical imaging research project at{' '}
            
            {/* Remplacement par les liens animés avec DotSeparator */}
            <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <AnimatedLink 
                href="https://www.becquerel.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                $isDarkMode={isDarkMode}
              >
                Henri Becquerel Cancer Center
              </AnimatedLink>
              <DotSeparator $isDarkMode={isDarkMode}>&bull;</DotSeparator>
              <AnimatedLink 
                href="https://www.univ-rouen.fr/etablissement/structures-de-formation-et-de-recherche/unites-de-recherche-et-de-service/aims-analyse-integree-multimodale-en-sante/" 
                target="_blank" 
                rel="noopener noreferrer"
                $isDarkMode={isDarkMode}
              >
                AIMS Lab
              </AnimatedLink>
            </span>.
            
            <br /><br />
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              Specialized in{' '}
              <TagContainer>
                {tags.map((tag, index) => {
                  let status = 'next';
                  if (index === currentTagIndex) status = 'current';
                  else if (index === (currentTagIndex - 1 + tags.length) % tags.length) status = 'previous';
                  
                  return (
                    <Tag key={tag} $status={status} $isDarkMode={isDarkMode}>
                      {tag}
                    </Tag>
                  );
                })}
              </TagContainer>
            </span>
          </Description>
        </AnimatedElement>

        <AnimatedElement $isLoaded={isLoaded} delay={400}>
          <ButtonGroup>
            <MagneticWrapper multiplier={0.15}>
              <ButtonPrimary $isDarkMode={isDarkMode} onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}>
                See Research
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </ButtonPrimary>
            </MagneticWrapper>
            
            <MagneticWrapper multiplier={0.15}>
              <ButtonOutline href="https://linkedin.com/in/aghiles-kebaili" target="_blank" rel="noopener noreferrer" $isDarkMode={isDarkMode}>
                LinkedIn
              </ButtonOutline>
            </MagneticWrapper>

            <MagneticWrapper multiplier={0.15}>
              <ButtonOutline href="https://github.com/Arksyd96" target="_blank" rel="noopener noreferrer" $isDarkMode={isDarkMode}>
                GitHub
              </ButtonOutline>
            </MagneticWrapper>
          </ButtonGroup>
        </AnimatedElement>
      </ContentWrapper>
    </HeroSection>
  );
}