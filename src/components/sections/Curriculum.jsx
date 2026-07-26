"use client";

import React from 'react';
import styled from '@emotion/styled';
import ScrollReveal from '../ui/ScrollReveal';
import MagneticWrapper from '../ui/MagneticWrapper';

const Section = styled.section`
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 5rem 1rem;
  display: flex;
  justify-content: center;
  font-family: 'IBM Plex Sans', sans-serif;
`;

const Container = styled.div`
  width: 100%;
  max-width: 950px;
  pointer-events: auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  font-family: 'Luxora Grotesk', 'Outfit', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#111827')};
`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  max-width: 36rem;
  text-align: center;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  border-top: ${({ $isFirst, $isDarkMode }) => 
    $isFirst 
      ? `1px solid ${$isDarkMode ? 'rgba(30,41,59,1)' : 'rgba(229,231,235,0.8)'}` 
      : 'none'};
  border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,1)' : 'rgba(229,231,235,0.8)')};
  
  transition: box-shadow 300ms, backdrop-filter 300ms, -webkit-backdrop-filter 300ms;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.4)')};
  
  backdrop-filter: blur(${({ $isDarkMode }) => ($isDarkMode ? '4px' : '2px')});
  -webkit-backdrop-filter: blur(${({ $isDarkMode }) => ($isDarkMode ? '4px' : '2px')});
  
  border-top-left-radius: ${({ $isFirst }) => ($isFirst ? '0.75rem' : '0')};
  border-top-right-radius: ${({ $isFirst }) => ($isFirst ? '0.75rem' : '0')};
  border-bottom-left-radius: ${({ $isLast }) => ($isLast ? '0.75rem' : '0')};
  border-bottom-right-radius: ${({ $isLast }) => ($isLast ? '0.75rem' : '0')};
  
  z-index: 1;

  &:hover {
    z-index: 10;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    backdrop-filter: blur(${({ $isDarkMode }) => ($isDarkMode ? '8px' : '4px')});
    -webkit-backdrop-filter: blur(${({ $isDarkMode }) => ($isDarkMode ? '8px' : '4px')});
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $isDarkMode }) => 
      $isDarkMode 
        ? 'linear-gradient(166deg, transparent 50%, rgba(129, 140, 248, 0.15) 80%, rgba(129, 140, 248, 0.28) 100%)' 
        : 'linear-gradient(166deg, transparent 50%, rgba(79, 70, 229, 0.1) 80%, rgba(79, 70, 229, 0.2) 100%)'
    };
    opacity: 0;
    transition: opacity 350ms ease-in-out;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const DateBadge = styled.span`
  font-size: 10px;
  font-weight: bold;
  font-family: monospace;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(99,102,241,0.1)' : '#eef2ff')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(99,102,241,0.3)' : '#e0e7ff')};
`;

const TopClassBadge = styled.span`
  font-size: 9px;
  font-weight: bold;
  font-family: 'IBM Plex Mono', monospace;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(16,185,129,0.1)' : '#ecfdf5')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#34d399' : '#047857')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(16,185,129,0.3)' : '#d1fae5')};
`;

const EduTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.3;
  margin-top: 0.75rem;
  margin-bottom: 0.2rem;
  font-family: 'Luxora Grotesk', 'Outfit', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#111827')};
  transition: color 300ms;
`;

const EduLocationLink = styled.a`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  text-decoration: none;
  margin-bottom: 0.75rem;
  display: inline-block;
  transition: opacity 200ms ease;
  
  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;

const EduDesc = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.6;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#cbd5e1' : '#4b5563')};
  font-family: 'Labrado B', 'Labrado', 'Manrope', sans-serif;
  margin: 0;
`;

export default function Curriculum({ isDarkMode }) {
  const education = [
    {
      date: "2022 — 2025",
      title: "Ph.D. in Computer Vision Applied to Medical Imaging",
      location: "Université de Rouen-Normandie, France",
      url: "https://www.univ-rouen.fr/",
      desc: "Thesis: 'Generative models for predicting cancer progression from multimodal data'. Defended with praise on Sept 16, 2025.",
      badge: 'FAST-TRACKED PH.D'
    },
    {
      date: "2021 — 2022",
      title: "M.Sc. in Computer Vision & Intelligent Machines",
      location: "Université Paris-Descartes, France",
      url: "https://u-paris.fr/",
      desc: "High specialization in deep learning, NLP, and statistical algorithms. Graduating Valedictorian (Ranked 1st) with ~15/20.",
      badge: "TOP OF CLASS"
    },
    {
      date: "2020 — 2021",
      title: "M.Sc. (M1) in Interactive & Intelligent Systems",
      location: "Université de Bretagne Occidentale (UBO), France",
      url: "https://www.univ-brest.fr/",
      desc: "Comprehensive study of distributed AI systems and embedded intelligence. Deep dive into hardware acceleration (Arduino, FPGA, SIMD vectorization) and advanced optimization techniques. Graduating Valedictorian (Ranked 1st) with ~15/20.",
      badge: "TOP OF CLASS"
    },
    {
      date: "2016 — 2019",
      title: "B.Sc. in Software Engineering & Intelligent Systems",
      location: "USTHB, Algiers",
      url: "https://www.usthb.dz/",
      desc: "Acquired software development paradigms, design patterns, and completed a thesis using Deep Belief Networks (DBN) for NLP-based road accident tracking.",
      badge: null
    }
  ];

  return (
    <Section id="curriculum" $isDarkMode={isDarkMode}>
      <Container>
        <ScrollReveal delay={0}>
          <SectionHeader>
            <SectionTitle $isDarkMode={isDarkMode}>
              Curriculum
            </SectionTitle>
            <SectionDescription>
              A rigorous academic path with continuous honors in computer science, computer vision, and AI
            </SectionDescription>
          </SectionHeader>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <CardList $isDarkMode={isDarkMode}>
            {education.map((edu, idx) => (
              <MagneticWrapper multiplier={0.02} key={idx}>
                <Card 
                  $isDarkMode={isDarkMode}
                  $isFirst={idx === 0}
                  $isLast={idx === education.length - 1}
                >
                  <CardHeaderRow>
                    <DateBadge $isDarkMode={isDarkMode}>
                      {edu.date}
                    </DateBadge>
                    
                    {edu.badge && (
                      <TopClassBadge $isDarkMode={isDarkMode}>
                        {edu.badge}
                      </TopClassBadge>
                    )}
                  </CardHeaderRow>
                  
                  <EduTitle $isDarkMode={isDarkMode}>
                    {edu.title}
                  </EduTitle>
                  
                  <EduLocationLink 
                    href={edu.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    $isDarkMode={isDarkMode}
                  >
                    {edu.location}
                  </EduLocationLink>
                  
                  <EduDesc $isDarkMode={isDarkMode}>
                    {edu.desc}
                  </EduDesc>
                </Card>
              </MagneticWrapper>
            ))}
          </CardList>
        </ScrollReveal>
      </Container>
    </Section>
  );
}