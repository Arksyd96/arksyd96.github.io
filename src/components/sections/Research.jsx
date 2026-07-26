"use client";

import React, { useState } from 'react';
import styled from '@emotion/styled';
import ScrollReveal from '../ui/ScrollReveal';

// ==========================================
// MATRICE DES POIDS (ÉDITABLE)
// ==========================================
const hoverDataMappings = {
  0: { in: [1, 0.9, 0.25, 0.5, 0.7], out: [1, 1, 1, 0.8] }, 
  1: { in: [0.8, 1, 0.3, 0.5, 0.35], out: [0.4, 0.6, 1, 0.9] }, 
  2: { in: [0.8, 0.5, 1, 0.25, 0.7], out: [0.25, 0.25, 0.3, 1] }, 
  3: { in: [0.6, 0.8, 0.5, 1, 0.4], out: [0.25, 0.7, 0.25, 1] }, 
  4: { in: [0.4, 0.3, 0.9, 0.6, 1], out: [0.25, 0.25, 0.6, 0.8] }  
};

const hoverTaskMappings = {
  0: { in: [1, 0.4, 0.25, 0.25, 0.3], out: [1, 0.5, 0.9, 0.4] }, 
  1: { in: [1, 0.8, 0.4, 0.7, 0.25], out: [0.5, 1, 0.3, 0.7] }, 
  2: { in: [1, 1, 0.25, 0.25, 0.5], out: [0.9, 0.3, 1, 0.4] }, 
  3: { in: [0.8, 0.9, 1, 1, 0.9], out: [0.4, 0.7, 0.4, 1] }  
};

const getPseudoRandom = (seed1, seed2, seed3) => {
  const x = Math.sin(seed1 * 12.9898 + seed2 * 78.233 + seed3 * 37.719) * 43758.5453;
  return Math.abs(x - Math.floor(x));
};

// ==========================================
// 1. STYLES DE LA STRUCTURE GLOBALE
// ==========================================
const Section = styled.section`
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1rem;
  font-family: 'IBM Plex Sans', sans-serif;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1024px; 
  pointer-events: auto;
  box-sizing: border-box;
`;

const BentoBox = styled.div`
  position: relative;
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 500ms;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(15,23,42,0.5)' : 'rgba(255,255,255,0.7)')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,0.8)' : 'rgba(229,231,235,0.6)')};
  box-shadow: ${({ $isDarkMode }) => ($isDarkMode ? '0 20px 60px -15px rgba(0,0,0,0.3)' : '0 20px 60px -15px rgba(0,0,0,0.05)')};
  box-sizing: border-box;
`;

const BentoBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
`;

const Grid = styled.div`
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  padding: 1.5rem;
  min-height: 300px;
  box-sizing: border-box;
  
  @media (min-width: 1024px) {
    grid-template-columns: 220px 1fr 220px;
    gap: 0.8rem;
  }
`;

// ==========================================
// NOUVEAUX STYLES : BOUTON ET PANNEAU INFO
// ==========================================
const InfoPanelWrapper = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? '150px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  overflow: hidden;
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(14, 165, 233, 0.1)' : 'rgba(14, 165, 233, 0.05)')};
  border-top: ${({ $isOpen, $isDarkMode }) => ($isOpen ? `1px solid ${$isDarkMode ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.2)'}` : '0px solid transparent')};
`;

const InfoPanelContent = styled.div`
  padding: 1.5rem 4rem 1.5rem 1.5rem; 
  font-size: 0.85rem;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#bae6fd' : '#0369a1')};
  line-height: 1.6;
  font-family: 'IBM Plex Sans', sans-serif;
`;

const InfoButton = styled.button`
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.1)')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(14, 165, 233, 0.4)' : 'rgba(14, 165, 233, 0.3)')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#38bdf8' : '#0284c7')};
  cursor: pointer;
  z-index: 20;
  transition: all 300ms;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 13px;
  padding: 0;

  &:hover {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.2)')};
    transform: scale(1.1);
    box-shadow: 0 0 10px ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(14, 165, 233, 0.3)' : 'rgba(14, 165, 233, 0.2)')};
  }
`;

// ==========================================
// 2. STYLES DE L'EN-TÊTE ET TYPOGRAPHIE
// ==========================================
const SectionHeader = styled.div`
  margin-bottom: 3.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 300;
  margin-bottom: 0.75rem;
  font-family: 'Luxora Grotesk', 'Outfit', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#111827')};
  line-height: 1.2;
`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  max-width: 40rem;
  line-height: 1.6;
`;

// ==========================================
// 3. STYLES DES COLONNES ET CARTES
// ==========================================
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const CenterColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 0;
`;

const ColumnHeader = styled.div`
  margin-bottom: 1rem;
  height: 24px;
  display: flex;
  align-items: center; 
  gap: 0.5rem;
  justify-content: ${({ $center }) => ($center ? 'center' : 'flex-start')};
`;

const ColumnTitle = styled.h4`
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  font-family: 'IBM Plex Mono', monospace;
  margin: 0;
  display: flex;
  align-items: center;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  height: 100%;
`;

// LA FAMEUSE HITBOX (Zone de survol étendue) - CORRECTION ICI
const ItemHoverZone = styled.div`
  width: 100%;
  padding-bottom: ${({ $isLast }) => ($isLast ? '0' : '0.5rem')};
  cursor: pointer;

  /* CSS standard : quand on survole la zone, on cible la div enfant (ItemCard) sans plugin ! */
  &:hover > div {
    transform: scale(1.03);
    border-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(129,140,248,0.8)' : '#4f46e5')};
  }
`;

const ItemCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.3rem;
  min-height: 30px; 
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  box-sizing: border-box;
  padding: 0.6rem 0.875rem;
  
  opacity: ${({ $isHoverActive, $isDirectlyHovered, $weight }) => {
    if (!$isHoverActive) return 1;
    if ($isDirectlyHovered) return 1;
    return 0.15 + ($weight * 0.85); 
  }};

  background-color: ${({ $isHoverActive, $isDarkMode }) => {
    if (!$isHoverActive) return $isDarkMode ? 'rgba(30,41,59,0.4)' : '#f8f9fc';
    return $isDarkMode ? 'rgba(49,46,129,0.6)' : '#e0e7ff';
  }};
  
  border: 1px solid ${({ $isHoverActive, $isDarkMode }) => {
    if (!$isHoverActive) return $isDarkMode ? 'rgba(51,65,85,0.6)' : 'rgba(229,231,235,0.8)';
    return $isDarkMode ? 'rgba(99,102,241,0.8)' : '#818cf8';
  }};

  box-shadow: ${({ $isDirectlyHovered, $isDarkMode }) => {
    if ($isDirectlyHovered) return $isDarkMode ? '0 4px 12px rgba(99,102,241,0.2)' : '0 4px 12px rgba(36,59,181,0.15)';
    return $isDarkMode ? '0 2px 4px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.02)';
  }};

  transform: ${({ $isDirectlyHovered }) => ($isDirectlyHovered ? 'scale(1.03)' : 'scale(1)')};
`;

const CardIcon = styled.span`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
`;

const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  overflow: hidden;
`;

const CardTitle = styled.h5`
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#f1f5f9' : '#111827')};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CardSubtitle = styled.p`
  font-size: 10px;
  font-weight: 500;
  margin: 2px 0 0 0;
  color: #6b7280;
  font-family: 'IBM Plex Mono', monospace;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const GlowDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  box-shadow: 0 0 8px ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  flex-shrink: 0;
`;

// ==========================================
// 4. STYLES DU RÉSEAU DE NEURONES 
// ==========================================
const MLPWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: none;
  
  @media (min-width: 1024px) {
    display: block;
  }
`;

const NetworkArea = styled.div`
  position: relative;
  flex-grow: 1;
  width: 100%;
  min-height: 272px;
`;

const SvgContainer = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
`;

const NetworkPath = styled.path`
  fill: none;
  vector-effect: non-scaling-stroke;
  transition: all 400ms ease-out;
`;

const Synapse = styled.line`
  vector-effect: non-scaling-stroke;
  transition: all 400ms ease-out;
`;

const NeuronNode = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 400ms ease-out;
`;

const ConnectionDot = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 400ms ease-out;
`;

// --- COMPOSANT RÉSEAU DE NEURONES ---
const MLPArchitecture = ({ isDarkMode, hoverState }) => {
  const inputYs = [ 24, 80, 136, 192, 248 ]; 
  const outputYs = [ 52, 108, 164, 220 ];  

  const mlpXs = [ 22, 36, 50, 64, 78 ];
  const mlpYs = [
    [ 76, 106, 136, 166, 196 ], 
    [ 46, 66, 86, 106, 126, 146, 166, 186, 206, 226 ], 
    [ 52, 76, 100, 124, 148, 172, 196, 220 ], 
    [ 66, 94, 122, 150, 178, 206 ], 
    [ 91, 121, 151, 181 ] 
  ];

  const baseColor = isDarkMode ? "rgba(99, 102, 241, 0.25)" : "rgba(36, 59, 181, 0.20)";
  const isHoverActive = !!hoverState;

  const getNodeWeight = (layerIdx, nodeIdx) => {
    if (!isHoverActive) return 0;
    
    if (layerIdx === 0) {
      return hoverState.type === 'data' ? hoverDataMappings[hoverState.idx].in[nodeIdx] : hoverTaskMappings[hoverState.idx].in[nodeIdx];
    }
    if (layerIdx === 4) {
      return hoverState.type === 'data' ? hoverDataMappings[hoverState.idx].out[nodeIdx] : hoverTaskMappings[hoverState.idx].out[nodeIdx];
    }

    const seed = (hoverState.type === 'data' ? 1 : 2) * 100 + hoverState.idx * 10 + layerIdx;
    const rand = getPseudoRandom(seed, nodeIdx, 0);
    return 0.3 + 0.7 * rand; 
  };

  const getLineStyle = (weight) => {
    if (!isHoverActive) return { stroke: baseColor, strokeWidth: 1 };
    
    const strokeWidth = 1 + (weight * 1.2); 
    const opacity = 0.05 + (weight * 0.60); 
    const strokeColor = isDarkMode ? `rgba(129, 140, 248, ${opacity})` : `rgba(36, 59, 181, ${opacity})`;
    
    return { stroke: strokeColor, strokeWidth };
  };

  return (
    <MLPWrapper>
      <SvgContainer viewBox="0 0 100 272" preserveAspectRatio="none">
        
        {inputYs.map((y, i) => {
          const w = getNodeWeight(0, i);
          const style = getLineStyle(w);
          return (
            <NetworkPath 
              key={`min-${i}`}
              d={`M 0,${y} C 11,${y} 11,${mlpYs[0][i]} 22,${mlpYs[0][i]}`} 
              style={style}
            />
          );
        })}

        {outputYs.map((y, i) => {
          const w = getNodeWeight(4, i);
          const style = getLineStyle(w);
          return (
            <NetworkPath 
              key={`mout-${i}`}
              d={`M 78,${mlpYs[4][i]} C 89,${mlpYs[4][i]} 89,${y} 100,${y}`} 
              style={style}
            />
          );
        })}

        {mlpYs.map((layer, lIdx) => {
          if (lIdx === mlpYs.length - 1) return null;
          const nextLayer = mlpYs[ lIdx + 1 ];
          
          return layer.map((y1, nIdx) => (
            nextLayer.map((y2, nnIdx) => {
              const wA = getNodeWeight(lIdx, nIdx);
              const wB = getNodeWeight(lIdx + 1, nnIdx);
              
              const texture = 0.8 + 0.4 * getPseudoRandom(lIdx, nIdx, nnIdx);
              let synapseWeight = ((wA + wB) / 2) * texture; 
              
              synapseWeight = Math.min(1, Math.max(0.1, synapseWeight));
              const style = getLineStyle(synapseWeight);

              return (
                <Synapse 
                  key={`mlink-${lIdx}-${nIdx}-${nnIdx}`}
                  x1={mlpXs[ lIdx ]} y1={y1} x2={mlpXs[ lIdx + 1 ]} y2={y2}
                  style={style}
                />
              );
            })
          ));
        })}
      </SvgContainer>

      {inputYs.map((y, i) => {
        const w = getNodeWeight(0, i);
        const opacity = !isHoverActive ? 0.6 : (0.5 + w * 0.5);
        const glowColor = isDarkMode ? 'rgba(129,140,248' : 'rgba(36,59,181';
        const shadow = (!isHoverActive) ? `0 0 4px ${glowColor},0.4)` : `0 0 ${w * 12}px ${glowColor},${w})`;
        
        return (
          <ConnectionDot 
            key={`c-in-${i}`}
            style={{
              left: '0%',
              top: `calc((${y} / 272) * 100%)`,
              opacity,
              backgroundColor: isDarkMode ? '#818cf8' : '#243bb5',
              boxShadow: shadow
            }}
          />
        );
      })}

      {outputYs.map((y, i) => {
        const w = getNodeWeight(4, i);
        const opacity = !isHoverActive ? 0.6 : (0.5 + w * 0.5);
        const glowColor = isDarkMode ? 'rgba(129,140,248' : 'rgba(36,59,181';
        const shadow = (!isHoverActive) ? `0 0 4px ${glowColor},0.4)` : `0 0 ${w * 12}px ${glowColor},${w})`;
        
        return (
          <ConnectionDot 
            key={`c-out-${i}`}
            style={{
              left: '100%',
              top: `calc((${y} / 272) * 100%)`,
              opacity,
              backgroundColor: isDarkMode ? '#818cf8' : '#243bb5',
              boxShadow: shadow
            }}
          />
        );
      })}

      {mlpYs.map((layer, lIdx) => (
        layer.map((y, nIdx) => {
          const w = getNodeWeight(lIdx, nIdx);
          const isHot = isHoverActive && w > 0.4;
          
          const nodeOpacity = isHoverActive ? (0.2 + w * 0.8) : 0.6; 
          const shadowSize = isHoverActive ? (w * 10) : 0; 

          const bgColor = isHot 
            ? (isDarkMode ? `rgba(129,140,248,${nodeOpacity})` : `rgba(36,59,181,${nodeOpacity})`) 
            : (isDarkMode ? '#0f172a' : '#ffffff');
          
          const borderStyle = isHot 
            ? `1.5px solid ${isDarkMode ? `rgba(165,180,252,${nodeOpacity})` : `rgba(29,47,145,${nodeOpacity})`}`
            : `1.5px solid ${isDarkMode ? 'rgba(129,140,248,0.5)' : 'rgba(36,59,181,0.5)'}`;
          
          const boxSh = isHot 
            ? (isDarkMode ? `0 0 ${shadowSize}px rgba(129,140,248,${nodeOpacity})` : `0 0 ${shadowSize}px rgba(36,59,181,${nodeOpacity * 0.7})`) 
            : 'none';

          return (
            <NeuronNode
              key={`mnode-${lIdx}-${nIdx}`}
              style={{
                left: `${mlpXs[lIdx]}%`,
                top: `calc((${y} / 272) * 100%)`,
                backgroundColor: bgColor,
                border: borderStyle,
                boxShadow: boxSh
              }}
            />
          );
        })
      ))}
    </MLPWrapper>
  );
};

// ==========================================
// 5. COMPOSANT PRINCIPAL
// ==========================================
export default function Research({ isDarkMode }) {
  const [hoverState, setHoverState] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const dataList = [
    { title: "Medical Images", sub: "MRI, PET, CT", icon: "🩻" },
    { title: "Radiomics", sub: "High-throughput", icon: "🎯" },
    { title: "Clinical Notes", sub: "EHR, History", icon: "📋" },
    { title: "Genomics", sub: "DNA, Proteomics", icon: "🧬" },
    { title: "Demographics", sub: "Lifestyle, Context", icon: "👤" }
  ];

  const taskList = [
    { title: "Multimodal Synthesis", sub: "MRI to PET", icon: "🔄" },
    { title: "Tumor Segmentation", sub: "Lesion delineation", icon: "🎯" },
    { title: "Multicentric Harmonization", sub: "Site normalization", icon: "🌍" },
    { title: "Spatiotemporal Forecasting", sub: "Evolution prediction", icon: "⏳" }
  ];

  const handleMouseEnter = (type, idx) => setHoverState({ type, idx });
  const handleMouseLeave = () => setHoverState(null);

  const getCardWeight = (type, idx) => {
    if (!hoverState) return 1;
    if (type === 'data') {
      return hoverState.type === 'data' ? hoverDataMappings[hoverState.idx].in[idx] : hoverTaskMappings[hoverState.idx].in[idx];
    } else {
      return hoverState.type === 'data' ? hoverDataMappings[hoverState.idx].out[idx] : hoverTaskMappings[hoverState.idx].out[idx];
    }
  };

  const isHoverActive = !!hoverState;

  return (
    <Section id="research" $isDarkMode={isDarkMode}>
      <Container>
        <ScrollReveal delay={0}>
          <SectionHeader>
            <SectionTitle $isDarkMode={isDarkMode}>
              Designing multimodal foundation models for clinical decision support
            </SectionTitle>
            <SectionDescription>
              Developing end-to-end architectures to monitor patient state and disease evolution by fusing Deep Learning, Generative AI, and Multi-Omics representations
            </SectionDescription>
          </SectionHeader>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <BentoBox $isDarkMode={isDarkMode}>
            <BentoBackground />

            <Grid>
              {/* COLONNE 1 : DATA EXPERTISE */}
              <ColumnContainer>
                <ColumnHeader>
                  <GlowDot $isDarkMode={isDarkMode} />
                  <div>
                    <ColumnTitle $isDarkMode={isDarkMode}>Data Expertise</ColumnTitle>
                    <p style={{ fontSize: '10px', color: '#6b7280', margin: 0, fontFamily: 'IBM Plex Mono, monospace' }}>
                      Unify every modality
                    </p>
                  </div>  
                </ColumnHeader>

                <CardList>
                  {dataList.map((item, i) => {
                    const weight = getCardWeight('data', i);
                    const isDirectlyHovered = isHoverActive && hoverState.type === 'data' && hoverState.idx === i;
                    const isLast = i === dataList.length - 1;
                    
                    return (
                      <ItemHoverZone 
                        key={item.title}
                        $isLast={isLast}
                        onMouseEnter={() => handleMouseEnter('data', i)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <ItemCard 
                          $weight={weight}
                          $isHoverActive={isHoverActive}
                          $isDirectlyHovered={isDirectlyHovered}
                          $isDarkMode={isDarkMode}
                        >
                          <CardIcon>{item.icon}</CardIcon>
                          <CardTextContainer>
                            <CardTitle $isDarkMode={isDarkMode}>{item.title}</CardTitle>
                            <CardSubtitle>{item.sub}</CardSubtitle>
                          </CardTextContainer>
                        </ItemCard>
                      </ItemHoverZone>
                    );
                  })}
                </CardList>
              </ColumnContainer>

              {/* COLONNE 2 : MLP ARCHITECTURE */}
              <CenterColumn>
                <ColumnHeader $center>
                  <GlowDot $isDarkMode={isDarkMode} />
                  <div>
                    <ColumnTitle $isDarkMode={isDarkMode}>Foundation Architectures</ColumnTitle>
                    <p style={{ fontSize: '10px', color: '#6b7280', margin: 0, fontFamily: 'IBM Plex Mono, monospace' }}>
                      Generative & predictive models
                    </p>
                  </div>  
                </ColumnHeader>
                
                <NetworkArea>
                  <MLPArchitecture 
                    isDarkMode={isDarkMode} 
                    hoverState={hoverState} 
                  />
                </NetworkArea>
              </CenterColumn>

              {/* COLONNE 3 : CLINICAL TASKS */}
              <ColumnContainer>
                <ColumnHeader>
                  <GlowDot $isDarkMode={isDarkMode} />
                  <div>
                    <ColumnTitle $isDarkMode={isDarkMode}>Clinical Applications</ColumnTitle>
                    <p style={{ fontSize: '10px', color: '#6b7280', margin: 0, fontFamily: 'IBM Plex Mono, monospace' }}>
                      From synthesis to forecasting
                    </p>
                  </div>
                </ColumnHeader>

                <CardList $center>
                  {taskList.map((task, i) => {
                    const weight = getCardWeight('task', i);
                    const isDirectlyHovered = isHoverActive && hoverState.type === 'task' && hoverState.idx === i;
                    const isLast = i === taskList.length - 1;

                    return (
                      <ItemHoverZone 
                        key={task.title}
                        $isLast={isLast}
                        onMouseEnter={() => handleMouseEnter('task', i)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <ItemCard 
                          $weight={weight}
                          $isHoverActive={isHoverActive}
                          $isDirectlyHovered={isDirectlyHovered}
                          $isDarkMode={isDarkMode}
                        >
                          <CardIcon>{task.icon}</CardIcon>
                          <CardTextContainer>
                            <CardTitle $isDarkMode={isDarkMode}>{task.title}</CardTitle>
                            <CardSubtitle>{task.sub}</CardSubtitle>
                          </CardTextContainer>
                        </ItemCard>
                      </ItemHoverZone>
                    );
                  })}
                </CardList>
              </ColumnContainer>
            </Grid>

            <InfoPanelWrapper $isOpen={isInfoOpen} $isDarkMode={isDarkMode}>
              <InfoPanelContent $isDarkMode={isDarkMode}>
                Drawing from my research and professional background in medical AI, I have designed and trained multimodal foundation models that fuse diverse data sources. The interactive highlighting within this network is not random; it precisely reflects my practical exposure and the actual correlation between these modalities and clinical tasks in my past projects.
              </InfoPanelContent>
            </InfoPanelWrapper>

            <InfoButton 
              $isDarkMode={isDarkMode} 
              onClick={() => setIsInfoOpen(!isInfoOpen)}
              title="Learn more about this interactive network"
            >
              ?
            </InfoButton>

          </BentoBox>
        </ScrollReveal>
      </Container>
    </Section>
  );
}