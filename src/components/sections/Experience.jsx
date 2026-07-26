"use client";

import React, { useState } from 'react';
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
  
  /* Transition allégée : on ne cible plus que l'ombre et le flou */
  transition: box-shadow 300ms, backdrop-filter 300ms, -webkit-backdrop-filter 300ms;
  
  /* Opacité fixe : on n'y touche plus jamais */
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.4)')};
  
  /* Flou dynamique : 8px/4px en sombre, 4px/2px en clair */
  backdrop-filter: blur(${({ $isExpanded, $isDarkMode }) => 
    $isDarkMode ? ($isExpanded ? '8px' : '4px') : ($isExpanded ? '4px' : '2px')
  });
  -webkit-backdrop-filter: blur(${({ $isExpanded, $isDarkMode }) => 
    $isDarkMode ? ($isExpanded ? '8px' : '4px') : ($isExpanded ? '4px' : '2px')
  });
  
  border-top-left-radius: ${({ $isFirst }) => ($isFirst ? '0.75rem' : '0')};
  border-top-right-radius: ${({ $isFirst }) => ($isFirst ? '0.75rem' : '0')};
  border-bottom-left-radius: ${({ $isLast }) => ($isLast ? '0.75rem' : '0')};
  border-bottom-right-radius: ${({ $isLast }) => ($isLast ? '0.75rem' : '0')};
  cursor: pointer;

  z-index: ${({ $isExpanded }) => ($isExpanded ? '10' : '1')};
  box-shadow: ${({ $isExpanded }) => 
    $isExpanded ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
  };

  &:hover {
    z-index: 10;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    /* Flou accentué au survol selon le thème */
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
    opacity: ${({ $isExpanded }) => ($isExpanded ? '1' : '0')};
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
  font-family: 'IBM Plex Mono', monospace;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(99,102,241,0.1)' : '#eef2ff')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(99,102,241,0.3)' : '#e0e7ff')};
`;

const LocationText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #9ca3af;
`;

const ExpTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.3;
  margin-top: 0.75rem;
  margin-bottom: 0.2rem;
  font-family: 'Luxora Grotesk', 'Outfit', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#111827')};
  transition: color 300ms;
`;

const InstitutionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const ExpInstitutionLink = styled.a`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  text-decoration: none;
  transition: opacity 200ms ease;
  
  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;

const DotSeparator = styled.span`
  font-size: 0.75rem;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#475569' : '#9ca3af')};
`;

const ExpDesc = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#cbd5e1' : '#4b5563')};
  font-family: 'Labrado B', 'Labrado', 'Manrope', sans-serif;
`;

const AccordionGrid = styled.div`
  display: grid;
  grid-template-rows: ${({ $isExpanded }) => ($isExpanded ? '1fr' : '0fr')};
  transition: grid-template-rows 350ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const AccordionContent = styled.div`
  overflow: hidden;
`;

const ExpPointsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 0 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 300;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#94a3b8' : '#6b7280')};
  font-family: 'Labrado B', 'Labrado', 'Manrope', sans-serif;
`;

const PointItem = styled.li`
  display: flex;
  gap: 0.5rem;
  line-height: 1.5;

  strong {
    font-weight: 700;
    color: inherit;
  }
`;

const Bullet = styled.span`
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  font-size: 1.2em;
  line-height: 1.2;
`;

const ToggleDetailsButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  margin-top: 0.5rem;
  transition: opacity 200ms ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 1rem;
    height: 1rem;
    transition: transform 300ms ease;
    transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export default function Experience({ isDarkMode }) {
  const [expandedExp, setExpandedExp] = useState(0);

  const experiences = [
    {
      date: "Nov. 2026 — Current",
      location: "Rouen / Paris, France",
      title: "Medical Imaging Research Engineer",
      institutions: [
        { name: "Institut Curie", url: "https://curie.fr/" },
        { name: "Henri Becquerel Cancer Center", url: "https://www.becquerel.fr/" }
      ],
      desc: "Research engineer on the PRT-K Federated-PET project, focused on developing federated multicenter solutions for PET image harmonization.",
      points: [
        "Developed deep unlearning approaches for multi-center PET image harmonization across 5 partner medical centers.",
        "Designed a Residual UNet-based translation approach for pseudo-EARL image generation from standard PET images, reaching near-optimal <strong style=\"font-family: 'IBM Plex Mono', monospace;\">aRE &lt; 3%</strong> SUV distribution matching and <strong style=\"font-family: 'IBM Plex Mono', monospace;\">CCC &gt;0.9</strong> radiomics reproducibility.",
        "Deployment of Federated Learning solutions on distributed clinical data without compromising patient privacy."
      ]
    },
    {
      date: "Sept. 2022 — Sept. 2025",
      location: "Rouen, France",
      title: "Computer Vision Doctoral Researcher / AI Scientist (Ph.D.)",
      institutions: [
        { name: "Université de Rouen-Normandie, AIMS Lab", url: "https://www.univ-rouen.fr/etablissement/structures-de-formation-et-de-recherche/unites-de-recherche-et-de-service/aims-analyse-integree-multimodale-en-sante/" },
        { name: "Henri Becquerel Cancer Center", url: "https://www.becquerel.fr/" }
      ],
      desc: "Design of robust generative augmentation models (VAE, Diffusion) to spatially and longitudinally model brain cancer (gliomas) evolution from rare and heterogeneous clinical acquisitions.",
      points: [
        "Increased multimodal brain segmentation Dice scores by <strong>+8%</strong> by designing diffusion-based generative data augmentation approaches for data-scarce regimes.",
        "Engineered a multi-task diffusion framework for spatio-temporal brain tumor forecasting, achieving a <strong>75%</strong> prediction Dice score, supported by our synthetic augmentation pipeline as a secondary strategy.",
        "Authored a comprehensive review on deep learning approaches for data augmentation in medical imaging, accumulating <strong>410+</strong> citations and establishing best practices for medical imaging synthesis.",
        "Reviewed articles for Nature and IEEE conferences, and instructed Master's courses in Deep Learning and Python programming (237h taught), demonstrating strong scientific leadership and technical communication."
      ]
    },
    {
      date: "Oct. 2021 — Sept. 2022",
      location: "Poissy, France",
      title: "Data Scientist",
      institutions: [
        { name: "Stellantis", url: "https://www.stellantis.com/" }
      ],
      desc: "Design of semantic architectures and facial recognition models applied to the automotive sector and global HR systems post-merger.",
      points: [
        "Developed NLP pipelines utilizing LDA and Sentence Transformer models for the semantic alignment of <strong>1000+</strong> job titles, facilitating the massive merger of the PSA Group and FCA Group job catalogs.",
        "Engineered a facial recognition model leveraging Vision Transformers and an ArcFace loss function for the SoftwareX team, achieving <strong>&lt; 1%</strong> ERR on the validation set using the Glint360K dataset."
      ]
    }
  ];

  return (
    <Section id="experience" $isDarkMode={isDarkMode}>
      <Container>
        <ScrollReveal delay={0}>
          <SectionHeader>
            <SectionTitle $isDarkMode={isDarkMode}>
              Experiences
            </SectionTitle>
            <SectionDescription>
              Building robust deep learning models applied to clinical oncology and industrial computer vision
            </SectionDescription>
          </SectionHeader>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <CardList $isDarkMode={isDarkMode}>
            {experiences.map((exp, idx) => {
              const isExpanded = expandedExp === idx;
              
              return (
                <MagneticWrapper multiplier={0.02} key={idx}>
                  <Card 
                    $isDarkMode={isDarkMode}
                    $isFirst={idx === 0}
                    $isLast={idx === experiences.length - 1}
                    $isExpanded={isExpanded}
                    onClick={() => setExpandedExp(isExpanded ? null : idx)}
                  >
                    <CardHeaderRow>
                      <DateBadge $isDarkMode={isDarkMode}>
                        {exp.date}
                      </DateBadge>
                      <LocationText>{exp.location}</LocationText>
                    </CardHeaderRow>
                    
                    <ExpTitle $isDarkMode={isDarkMode}>
                      {exp.title}
                    </ExpTitle>
                    
                    <InstitutionsContainer>
                      {exp.institutions.map((inst, iIdx) => (
                        <React.Fragment key={iIdx}>
                          <ExpInstitutionLink 
                            href={inst.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            $isDarkMode={isDarkMode}
                          >
                            {inst.name}
                          </ExpInstitutionLink>
                          {iIdx < exp.institutions.length - 1 && (
                            <DotSeparator $isDarkMode={isDarkMode}>&bull;</DotSeparator>
                          )}
                        </React.Fragment>
                      ))}
                    </InstitutionsContainer>
                    
                    <ExpDesc $isDarkMode={isDarkMode}>
                      {exp.desc}
                    </ExpDesc>

                    <AccordionGrid $isExpanded={isExpanded}>
                      <AccordionContent>
                        <ExpPointsList $isDarkMode={isDarkMode}>
                          {exp.points.map((point, pIdx) => (
                            <PointItem key={pIdx}>
                              <Bullet $isDarkMode={isDarkMode}>•</Bullet>
                              <span dangerouslySetInnerHTML={{ __html: point }} />
                            </PointItem>
                          ))}
                        </ExpPointsList>
                      </AccordionContent>
                    </AccordionGrid>

                    <ToggleDetailsButton $isDarkMode={isDarkMode} $isExpanded={isExpanded}>
                      {isExpanded ? "Hide Details" : "View Technical Details"}
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </ToggleDetailsButton>

                  </Card>
                </MagneticWrapper>
              );
            })}
          </CardList>
        </ScrollReveal>
      </Container>
    </Section>
  );
}