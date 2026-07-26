"use client";

import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const marqueeAnimation = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-33.33%); }
`;

const MarqueeContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  overflow: hidden;
  position: relative;
  z-index: 10;
  pointer-events: none;
  border-top: 1px solid ${({ isDarkMode }) => (isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(229,231,235,0.5)')};
  border-bottom: 1px solid ${({ isDarkMode }) => (isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(229,231,235,0.5)')};
  background-color: ${({ isDarkMode }) => (isDarkMode ? 'rgba(15,23,42,0.3)' : 'rgba(248,249,252,0.5)')};
`;

const MarqueeTrack = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${marqueeAnimation} 30s linear infinite;
`;

const MarqueeItem = styled.span`
  margin: 0 2rem;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: monospace;
  color: ${({ isDarkMode }) => (isDarkMode ? '#64748b' : '#9ca3af')};
`;

export default function TechMarquee({ isDarkMode }) {
  const skills = [
    "Deep Learning", "Generative Modeling", "Multi-Omics", "PyTorch", 
    "Diffusion Models", "Federated Learning", "Transformers", "Medical Imaging", 
    "Computer Vision", "Radiomics"
  ];
  // Triplé pour assurer le flux continu pendant le scroll horizontal
  const displaySkills = [...skills, ...skills, ...skills];

  return (
    <MarqueeContainer isDarkMode={isDarkMode}>
      <MarqueeTrack>
        {displaySkills.map((skill, index) => (
          <MarqueeItem key={index} isDarkMode={isDarkMode}>
            {skill}
          </MarqueeItem>
        ))}
      </MarqueeTrack>
    </MarqueeContainer>
  );
}