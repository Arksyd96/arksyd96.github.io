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

const PubCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  border-top: ${({ $isFirst, $isDarkMode }) => 
    $isFirst 
      ? `1px solid ${$isDarkMode ? 'rgba(30,41,59,1)' : 'rgba(229,231,235,0.8)'}` 
      : 'none'};
  border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,1)' : 'rgba(229,231,235,0.8)')};
  
  transition: box-shadow 300ms, backdrop-filter 300ms, -webkit-backdrop-filter 300ms;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.4)')};
  
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
  overflow: hidden;

  z-index: ${({ $isExpanded }) => ($isExpanded ? '10' : '1')};
  box-shadow: ${({ $isExpanded }) => 
    $isExpanded ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
  };

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
    opacity: ${({ $isExpanded }) => ($isExpanded ? '1' : '0')};
    transition: opacity 350ms ease-in-out;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const MainRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 768px) {
    grid-template-columns: 100px 1fr auto;
    align-items: center;
  }
`;

const DateBadge = styled.span`
  display: inline-block;
  font-size: 10px;
  font-weight: bold;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(99,102,241,0.1)' : '#eef2ff')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(99,102,241,0.3)' : '#e0e7ff')};
  white-space: nowrap;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  
  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-end; 
  }
`;

const StatusBadge = styled.span`
  font-size: 9px;
  font-weight: bold;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.05em;
  padding: 0.125rem 0.4rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  white-space: nowrap;
  
  background-color: ${({ $status, $isDarkMode }) => {
    if ($status === 'PUBLISHED') return $isDarkMode ? 'rgba(16,185,129,0.1)' : '#ecfdf5';
    if ($status === 'ARXIV' || $status === 'ORAL PRESENTATION') return $isDarkMode ? 'rgba(245,158,11,0.1)' : '#fffbeb';
    return $isDarkMode ? 'rgba(244,63,94,0.1)' : '#fff1f2';
  }};
  
  color: ${({ $status, $isDarkMode }) => {
    if ($status === 'PUBLISHED') return $isDarkMode ? '#34d399' : '#047857';
    if ($status === 'ARXIV' || $status === 'ORAL PRESENTATION') return $isDarkMode ? '#fbbf24' : '#d97706';
    return $isDarkMode ? '#fb7185' : '#e11d48'; 
  }};
  
  border: 1px solid ${({ $status, $isDarkMode }) => {
    if ($status === 'PUBLISHED') return $isDarkMode ? 'rgba(16,185,129,0.3)' : '#d1fae5';
    if ($status === 'ARXIV' || $status === 'ORAL PRESENTATION') return $isDarkMode ? 'rgba(245,158,11,0.3)' : '#fef3c7';
    return $isDarkMode ? 'rgba(244,63,94,0.3)' : '#ffe4e6'; 
  }};
`;

const DistinctionBadge = styled.span`
  font-size: 9px;
  font-weight: bold;
  font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.05em;
  padding: 0.125rem 0.4rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  white-space: nowrap;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(59,130,246,0.12)' : '#eff6ff')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#93c5fd' : '#1d4ed8')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(59,130,246,0.35)' : '#dbeafe')};
`;

const VenueBadge = styled.span`
  font-size: 9px;
  font-weight: bold;
  font-family: 'IBM Plex Mono', monospace;
  padding: 0.125rem 0.4rem;
  border-radius: 0.25rem;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(168,85,247,0.1)' : '#faf5ff')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#c084fc' : '#9333ea')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(168,85,247,0.3)' : '#f3e8ff')};
  white-space: nowrap;
`;

const TitleCol = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1.5rem;
`;

const PubTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3;
  margin: 0 0 0.2rem 0;
  font-family: 'Luxora Grotesk', 'Outfit', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#f1f5f9' : '#111827')};
`;

const Authors = styled.p`
  font-size: 0.7rem;
  font-weight: 300;
  margin: 0;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#94a3b8' : '#6b7280')};
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

const AbstractInner = styled.div`
  padding-top: 0.75rem;
  padding-bottom: 0.5rem;
  @media (min-width: 768px) {
    padding-left: 100px;
  }
`;

const AbstractTitle = styled.h4`
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'IBM Plex Mono', monospace;
  margin-bottom: 0.35rem;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
`;

const AbstractText = styled.p`
  font-size: 0.825rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#cbd5e1' : '#4b5563')};
  font-family: 'Labrado B', 'Labrado', 'Manrope', sans-serif;
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 0.3rem;
  text-decoration: none;
  transition: background-color 300ms;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#4f46e5' : '#243bb5')};
  color: #ffffff;

  &:hover {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#4338ca' : '#1e3a8a')};
  }
`;

export default function Publications({ isDarkMode }) {
  const [expandedPub, setExpandedPub] = useState(null);

  const publicationsData = [
    {
      date: "OCT 2026",
      title: "PseudoEARL-Net: a deep learning-based harmonization tool for retrospective EARL harmonization of multicenter FDG PET/CT",
      authors: "A. Kebaili, T. Carlier, A. Girard, A. Devillers, O. Humbert, S. Hapdey, C. Boucherie, F. Orlhac, P. Decazes",
      status: "ORAL PRESENTATION",
      venue: "EANM 2026",
      hasLink: false,
      abstract: "Aim/Introduction: EARL harmonization from raw PET data is critical for multicenter quantitative [18F]FDG PET/CT. We investigated whether non-harmonized standard PET images could be retrospectively standardized into EARL-compliant reconstructions through a data-efficient deep learning framework. Materials and Methods: We developed a U-Net-based residual image-to-image translation framework (PseudoEARL-Net) that predicts a voxel-wise Δ-map between standard PET and EARL-reconstructed images. Conclusion: Our PseudoEARL-Net model enables robust high-fidelity pseudo-EARL translation from routine [18F]FDG PET/CT scans, supporting radiomic reproducibility and the inclusion of historical non-compliant datasets in multicenter studies."
    },
    {
      date: "MAY 2026",
      title: "Multi-task diffusion approach for prediction of glioma tumor progression",
      authors: "A. Kebaili, R. Modzelewski, J. Lapuyade-Lahorgue, M. Fontanilles, S. Thureau, S. Ruan",
      status: "ARXIV",
      venue: "arXiv",
      hasLink: true,
      link: "#",
      abstract: "We propose a multi-task diffusion architecture dedicated to the spatio-temporal prediction of glioma progression. This model jointly generates future FLAIR sequences and probabilistic evolution maps based on Signed Distance Fields (SDF), integrating uncertainty quantification. Evaluated on both public datasets and a private internal cohort, the approach confirms strong inter-center robustness."
    },
    {
      date: "APR 2025",
      title: "AMM-diff: Adaptive multi-modality diffusion network for missing modality imputation",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, P. Vera, S. Ruan",
      status: "PUBLISHED",
      venue: "ISBI 2025",
      hasLink: true,
      link: "#",
      abstract: "We propose AMM-Diff, a solution for missing MRI modality imputation from any available combination using an Image-Frequency Fusion Network (IFFN). The method adopts an adaptive reconstruction strategy to produce complete and coherent modalities, providing robust segmentation performance even under incomplete acquisitions."
    },
    {
      date: "JUL 2025",
      title: "Multi-modal MRI synthesis with conditional latent diffusion models for data augmentation in tumor segmentation",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, P. Vera, S. Ruan",
      status: "PUBLISHED",
      venue: "CMIG",
      hasLink: true,
      link: "#",
      abstract: "This paper extends latent diffusion models to multi-modal frameworks, simultaneously generating multiple MRI sequences and associated masks while allowing condition-based tumor characteristics. The model produces coherent multi-modal datasets that significantly enhance downstream multi-sequence segmentation tasks on BRATS."
    },
    {
      date: "JUN 2024",
      title: "Discriminative hamiltonian variational autoencoder for accurate tumor segmentation in data-scarce regimes",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, P. Vera, S. Ruan",
      status: "PUBLISHED",
      venue: "Neurocomputing",
      hasLink: true,
      link: "#",
      abstract: "We present an HVAE with discriminative regularization designed to focus generation on relevant regions of interest. By integrating Hamiltonian dynamics for better latent space exploration, the model generates artifact-free image/mask pairs that improve Dice scores in data-scarce segmentation regimes."
    },
    {
      date: "MAR 2023",
      title: "Deep learning approaches for data augmentation in medical imaging: a review",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, S. Ruan",
      status: "PUBLISHED",
      distinction: "420+ CITATIONS · PAPER OF THE YEAR",
      venue: "J. of Imaging",
      hasLink: true,
      link: "#",
      abstract: "This review critically synthesizes and compares major generative model families (VAEs, GANs, diffusion models) applied to medical imaging data augmentation. We highlight trade-offs between visual quality, sample diversity, and computational cost, proposing practical clinical recommendations."
    }
  ];

  return (
    <Section id="publications" $isDarkMode={isDarkMode}>
      <Container>
        <ScrollReveal delay={0}>
          <SectionHeader>
            <SectionTitle $isDarkMode={isDarkMode}>
              Publications
            </SectionTitle>
            <SectionDescription>
              Selected peer-reviewed conference, journal and preprint papers
            </SectionDescription>
          </SectionHeader>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <CardList $isDarkMode={isDarkMode}>
            {publicationsData.map((pub, idx) => {
              const isExpanded = expandedPub === idx;
              
              return (
                <MagneticWrapper multiplier={0.015} key={idx}>
                  <PubCard 
                    $isDarkMode={isDarkMode}
                    $isFirst={idx === 0}
                    $isLast={idx === publicationsData.length - 1}
                    $isExpanded={isExpanded}
                    onClick={() => setExpandedPub(isExpanded ? null : idx)}
                  >
                    <MainRow>
                      <div>
                        <DateBadge $isDarkMode={isDarkMode}>{pub.date}</DateBadge>
                      </div>

                      <TitleCol>
                        <PubTitle $isDarkMode={isDarkMode}>{pub.title}</PubTitle>
                        <Authors $isDarkMode={isDarkMode}>
                          {pub.authors.split(', ').map((author, aIdx) => (
                            <span key={aIdx}>
                              {author === 'A. Kebaili' ? (
                                <strong style={{ color: isDarkMode ? '#f8fafc' : '#1f2937', fontWeight: 600 }}>{author}</strong>
                              ) : (
                                author
                              )}
                              {aIdx < pub.authors.split(', ').length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </Authors>
                      </TitleCol>

                      <RightColumn>
                        <StatusBadge $status={pub.status} $isDarkMode={isDarkMode}>
                          {pub.status}
                        </StatusBadge>
                        {pub.distinction && (
                          <DistinctionBadge $isDarkMode={isDarkMode}>
                            {pub.distinction}
                          </DistinctionBadge>
                        )}
                        <VenueBadge $isDarkMode={isDarkMode}>
                          {pub.venue}
                        </VenueBadge>
                      </RightColumn>
                    </MainRow>

                    <AccordionGrid $isExpanded={isExpanded}>
                      <AccordionContent>
                        <AbstractInner>
                          <AbstractTitle $isDarkMode={isDarkMode}>Abstract</AbstractTitle>
                          <AbstractText $isDarkMode={isDarkMode}>
                            {pub.abstract}
                          </AbstractText>
                          {pub.hasLink && (
                            <ActionLink 
                              href={pub.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              onClick={(e) => e.stopPropagation()}
                              $isDarkMode={isDarkMode}
                            >
                              View Publication
                              <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </ActionLink>
                          )}
                        </AbstractInner>
                      </AccordionContent>
                    </AccordionGrid>
                  </PubCard>
                </MagneticWrapper>
              );
            })}
          </CardList>
        </ScrollReveal>
      </Container>
    </Section>
  );
}