"use client";

import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

const MagneticBox = styled.div`
  display: inline-block;
  position: relative;
  z-index: 50;
  transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
  transition: transform ${(props) => 
    props.isHovered 
      ? '0.2s cubic-bezier(0.23, 1, 0.32, 1)' 
      : '0.5s cubic-bezier(0.25, 1, 0.5, 1)'};
`;

export default function MagneticWrapper({ children, multiplier = 0.15 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * multiplier; 
    const y = (clientY - (top + height / 2)) * multiplier; 
    setPos({ x, y });
  };

  return (
    <MagneticBox
      ref={ref}
      x={pos.x}
      y={pos.y}
      isHovered={isHovered}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPos({ x: 0, y: 0 });
      }}
    >
      {children}
    </MagneticBox>
  );
}