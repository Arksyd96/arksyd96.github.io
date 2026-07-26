"use client";

import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

// Déclaration de notre variable de style
const RevealContainer = styled.div`
  transition: all 1000ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: ${(props) => props.delay}ms;
  transform: ${(props) => (props.isVisible ? 'translateY(0)' : 'translateY(3rem)')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;

export default function ScrollReveal({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.1 } 
    );
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <RevealContainer ref={domRef} isVisible={isVisible} delay={delay}>
      {children}
    </RevealContainer>
  );
}