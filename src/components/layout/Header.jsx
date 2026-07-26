"use client";

import React, { useState } from 'react';
import styled from '@emotion/styled';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 40;
  height: 8rem;
  display: flex;
  align-items: flex-start;
  padding: 1.5rem 2rem 0;
  pointer-events: none;
  box-sizing: border-box; 

  @media (min-width: 768px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(4px);
  transition: background-color 500ms;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(9, 13, 22, 0.2)' : 'rgba(255, 255, 255, 0.2)')};
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  pointer-events: auto;
  box-sizing: border-box;
`;

const Spacer = styled.div`
  width: 6rem;
`;

const Navigation = styled.nav`
  display: none;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const NavLink = styled.a`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-family: 'Inter', sans-serif;
  transition: color 300ms;
  text-decoration: none;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#94a3b8' : '#6b7280')};

  &:hover {
    color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Label = styled.span`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'Inter', sans-serif;
  transition: color 300ms;
  color: ${({ $isDarkMode, $isActive }) => {
    if ($isActive) return $isDarkMode ? '#818cf8' : '#4b5563';
    return $isDarkMode ? '#94a3b8' : '#9ca3af';
  }};

  .toggle-container:hover & {
    color: ${({ $isDarkMode, $isActive }) => ($isDarkMode ? ($isActive ? '#818cf8' : '#e2e8f0') : '#4b5563')};
  }
`;

const ToggleTrack = styled.div`
  width: 2.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: background-color 300ms;
  background-color: ${({ $isActive, $isDarkMode }) => {
    if (!$isActive) return '#d1d5db';
    return $isDarkMode ? '#4f46e5' : '#243bb5';
  }};
`;

const ToggleThumb = styled.div`
  width: 0.75rem; 
  height: 0.75rem;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: transform 300ms;
  transform: ${({ $isActive }) => ($isActive ? 'translateX(1rem)' : 'translateX(0)')}; 
`;

const NetworkGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 300ms;
  color: ${({ $isDarkMode, $isOpen }) => {
    if ($isOpen) return $isDarkMode ? '#818cf8' : '#243bb5';
    return $isDarkMode ? '#64748b' : '#9ca3af';
  }};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.3)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};

  &:hover {
    color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
    transform: rotate(45deg);
  }

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

const ConfigPanel = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 1rem;
  width: 260px;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)')};
  backdrop-filter: blur(12px);
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30, 41, 59, 1)' : 'rgba(229, 231, 235, 1)')};
  box-shadow: ${({ $isDarkMode }) => ($isDarkMode ? '0 10px 30px -10px rgba(0,0,0,0.5)' : '0 10px 30px -10px rgba(0,0,0,0.1)')};
`;

const PanelHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30, 41, 59, 1)' : 'rgba(229, 231, 235, 1)')};
  padding-bottom: 0.75rem;
  margin-bottom: 0.25rem;
`;

const PanelHeaderText = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'Inter', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#f1f5f9' : '#111827')};
`;

const ResetButton = styled.button`
  background: none;
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(51, 65, 85, 1)' : '#e5e7eb')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#94a3b8' : '#6b7280')};
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'Inter', sans-serif;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(51, 65, 85, 0.5)' : '#f3f4f6')};
    color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
    border-color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  }
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ControlLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#94a3b8' : '#6b7280')};
`;

const ControlValue = styled.span`
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  font-family: 'IBM Plex Mono', monospace;
`;

const StyledSlider = styled.input`
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(51, 65, 85, 1)' : '#e5e7eb')};
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
    cursor: pointer;
    transition: transform 150ms;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.25);
  }
`;

export default function Header({ 
  isDarkMode, 
  setIsDarkMode, 
  isParticlesEnabled, 
  setIsParticlesEnabled,
  particleSpeed,
  setParticleSpeed,
  particleDensity,
  setParticleDensity,
  particleSize,
  setParticleSize
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = (e) => {
    e.stopPropagation();
    if (isParticlesEnabled) {
      setIsPanelOpen(!isPanelOpen);
    }
  };

  const handleNetworkToggle = () => {
    setIsParticlesEnabled(!isParticlesEnabled);
    if (isParticlesEnabled && isPanelOpen) {
      setIsPanelOpen(false);
    }
  };

  const handleReset = () => {
    setParticleSpeed(50);
    setParticleDensity(50);
    setParticleSize(50);
  };

  return (
    <HeaderWrapper>
      <Backdrop $isDarkMode={isDarkMode} />
      <ContentContainer>
        <Spacer />
        
        <Navigation>
          {['Research', 'Experience', 'Curriculum', 'Publications', 'Contact'].map((item) => (
            <NavLink key={item} href={`#${item.toLowerCase()}`} $isDarkMode={isDarkMode}>
              {item}
            </NavLink>
          ))}
        </Navigation>
        
        <ControlsWrapper>
          <ToggleContainer className="toggle-container" onClick={() => setIsDarkMode(!isDarkMode)}>
            <Label $isDarkMode={isDarkMode} $isActive={isDarkMode}>Nightly</Label>
            <ToggleTrack $isActive={isDarkMode} $isDarkMode={isDarkMode}>
              <ToggleThumb $isActive={isDarkMode} />
            </ToggleTrack>
          </ToggleContainer>

          <NetworkGroup>
            <ToggleContainer className="toggle-container" onClick={handleNetworkToggle}>
              <Label $isDarkMode={isDarkMode} $isActive={isParticlesEnabled}>Network</Label>
              <ToggleTrack $isActive={isParticlesEnabled} $isDarkMode={isDarkMode}>
                <ToggleThumb $isActive={isParticlesEnabled} />
              </ToggleTrack>
            </ToggleContainer>

            <SettingsButton 
              $isDarkMode={isDarkMode} 
              $isOpen={isPanelOpen} 
              $isVisible={isParticlesEnabled}
              onClick={togglePanel}
              title="Network Settings"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </SettingsButton>
          </NetworkGroup>

          <ConfigPanel $isOpen={isPanelOpen} $isDarkMode={isDarkMode}>
            <PanelHeaderWrapper $isDarkMode={isDarkMode}>
              <PanelHeaderText $isDarkMode={isDarkMode}>Network Engine</PanelHeaderText>
              <ResetButton $isDarkMode={isDarkMode} onClick={handleReset}>Default</ResetButton>
            </PanelHeaderWrapper>
            
            <ControlGroup>
              <ControlLabel $isDarkMode={isDarkMode}>
                Speed <ControlValue $isDarkMode={isDarkMode}>{particleSpeed}%</ControlValue>
              </ControlLabel>
              <StyledSlider 
                type="range" 
                min="10" 
                max="200" 
                value={particleSpeed} 
                onChange={(e) => setParticleSpeed(Number(e.target.value))}
                $isDarkMode={isDarkMode}
              />
            </ControlGroup>

            <ControlGroup>
              <ControlLabel $isDarkMode={isDarkMode}>
                Density <ControlValue $isDarkMode={isDarkMode}>{particleDensity}%</ControlValue>
              </ControlLabel>
              <StyledSlider 
                type="range" 
                min="10" 
                max="200" 
                value={particleDensity} 
                onChange={(e) => setParticleDensity(Number(e.target.value))}
                $isDarkMode={isDarkMode}
              />
            </ControlGroup>

            <ControlGroup>
              <ControlLabel $isDarkMode={isDarkMode}>
                Node Size <ControlValue $isDarkMode={isDarkMode}>{particleSize}%</ControlValue>
              </ControlLabel>
              <StyledSlider 
                type="range" 
                min="20" 
                max="250" 
                value={particleSize} 
                onChange={(e) => setParticleSize(Number(e.target.value))}
                $isDarkMode={isDarkMode}
              />
            </ControlGroup>
          </ConfigPanel>

        </ControlsWrapper>
      </ContentContainer>
    </HeaderWrapper>
  );
}