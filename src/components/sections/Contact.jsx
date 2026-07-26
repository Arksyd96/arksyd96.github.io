"use client";

import React, { useState } from 'react';
import styled from '@emotion/styled';
import ScrollReveal from '../ui/ScrollReveal';

const Section = styled.section`
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 5rem 1rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const BentoContact = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,1)' : 'rgba(229,231,235,0.8)')};
  
  transition: box-shadow 300ms, backdrop-filter 300ms, -webkit-backdrop-filter 300ms;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.4)')};
  
  backdrop-filter: blur(${({ $isDarkMode }) => ($isDarkMode ? '4px' : '2px')});
  -webkit-backdrop-filter: blur(${({ $isDarkMode }) => ($isDarkMode ? '4px' : '2px')});
  
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
    z-index: -1;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 1.8fr;
    padding: 2rem;
  }
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,1)' : 'rgba(229,231,235,0.8)')};

  @media (min-width: 1024px) {
    padding-right: 1.5rem;
    padding-bottom: 0;
    border-bottom: none;
    border-right: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,1)' : 'rgba(229,231,235,0.8)')};
  }
`;

const PanelTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 0.75rem;
  font-family: 'Luxora Grotesk', 'Outfit', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#111827')};
`;

const PanelDescription = styled.p`
  font-size: 0.75rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #6b7280;
`;

const InfoBox = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,1)' : '#f3f4f6')};
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(2,6,23,0.4)' : 'rgba(248,249,252,0.8)')};
`;

const InfoLabel = styled.span`
  display: block;
  font-size: 9px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
`;

const InfoText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#cbd5e1' : '#374151')};
`;

const InfoLink = styled.a`
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  transition: opacity 200ms;

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;

const LocationFootnote = styled.div`
  font-size: 10px;
  color: #9ca3af;
  font-family: 'IBM Plex Mono', monospace;
`;

const FormContainer = styled.div`
  @media (min-width: 1024px) {
    padding-left: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin-bottom: 0.35rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  outline: none;
  transition: all 300ms;
  box-sizing: border-box;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(2,6,23,0.8)' : 'rgba(248,249,252,0.8)')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,1)' : 'rgba(229,231,235,0.8)')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#f1f5f9' : '#111827')};

  &:focus {
    border-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(129,140,248,0.6)' : 'rgba(36,59,181,0.6)')};
    box-shadow: 0 0 0 2px ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(36,59,181,0.1)')};
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  outline: none;
  resize: vertical;
  min-height: 100px;
  transition: all 300ms;
  box-sizing: border-box;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(2,6,23,0.8)' : 'rgba(248,249,252,0.8)')};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,1)' : 'rgba(229,231,235,0.8)')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#f1f5f9' : '#111827')};

  &:focus {
    border-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(129,140,248,0.6)' : 'rgba(36,59,181,0.6)')};
    box-shadow: 0 0 0 2px ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(36,59,181,0.1)')};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 300ms;
  margin-top: 0.5rem;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#4f46e5' : '#243bb5')};

  &:hover:not(:disabled) {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#4338ca' : '#1e3a8a')};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessBox = styled.div`
  padding: 1.5rem;
  border-radius: 0.75rem;
  text-align: center;
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(16,185,129,0.2)' : '#bbf7d0')};
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(16,185,129,0.1)' : '#ecfdf5')};
`;

const SuccessTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#34d399' : '#065f46')};
`;

const SuccessText = styled.p`
  font-size: 0.75rem;
  margin-top: 0.35rem;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#6ee7b7' : '#047857')};
`;

const ResetButton = styled.button`
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#818cf8' : '#243bb5')};
  
  &:hover {
    text-decoration: underline;
  }
`;

const ConclusionBox = styled.div`
  margin-top: 4rem;
  padding: 2.5rem 1.5rem;
  text-align: center;
  border-radius: 1.5rem;
  
  /* Styles de base (Mode Blanc) */
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(30,41,59,1)' : '#f3f4f6')};
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(15,23,42,0.4)' : 'rgba(248,249,252,0.3)')};
  
  /* Ajout des effets spécifiques uniquement pour le Nightly */
  ${({ $isDarkMode }) => $isDarkMode && `
    position: relative;
    overflow: hidden;
    transition: box-shadow 300ms, backdrop-filter 300ms, -webkit-backdrop-filter 300ms;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 1;

    &:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(166deg, transparent 50%, rgba(129, 140, 248, 0.15) 80%, rgba(129, 140, 248, 0.28) 100%);
      opacity: 0;
      transition: opacity 350ms ease-in-out;
      pointer-events: none;
      z-index: -1;
    }

    &:hover::after {
      opacity: 1;
    }
  `}
`;

const ConclusionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 0.75rem;
  font-family: 'Luxora Grotesk', 'Outfit', sans-serif;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#111827')};
`;

const ConclusionText = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  max-width: 42rem;
  margin: 0 auto;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#94a3b8' : '#6b7280')};
`;

export default function Contact({ isDarkMode }) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formspreeEndpoint = "https://formspree.io/f/mqerwedb";

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage
        })
      });

      if (response.ok) {
        setIsSubmitting(false); 
        setSubmitSuccess(true);
        setContactName(''); 
        setContactEmail(''); 
        setContactSubject(''); 
        setContactMessage('');
      } else {
        setIsSubmitting(false);
        alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer plus tard.");
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("Erreur de connexion. Vérifiez votre réseau.");
    }
  };

  return (
    <Section id="contact" $isDarkMode={isDarkMode}>
      <Container>
        <ScrollReveal delay={0}>
          <SectionHeader>
            <SectionTitle $isDarkMode={isDarkMode}>
              Contact & Collaborations
            </SectionTitle>
            <SectionDescription>
              Let's discuss computer vision challenges, multi-omics clinical research, or open ML research collaborations
            </SectionDescription>
          </SectionHeader>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <BentoContact $isDarkMode={isDarkMode}>
            <InfoPanel $isDarkMode={isDarkMode}>
              <div>
                <PanelTitle $isDarkMode={isDarkMode}>Get in touch</PanelTitle>
                <PanelDescription>
                  If you are a clinician looking for AI assistance, a machine learning researcher, or a student looking for clinical imaging internships, feel free to drop a message.
                </PanelDescription>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <InfoBox $isDarkMode={isDarkMode}>
                    <InfoLabel $isDarkMode={isDarkMode}>Affiliation</InfoLabel>
                    <InfoText $isDarkMode={isDarkMode}>Henri Becquerel Cancer Center - AIMS Lab</InfoText>
                  </InfoBox>
                  <InfoBox $isDarkMode={isDarkMode}>
                    <InfoLabel $isDarkMode={isDarkMode}>Academic Email</InfoLabel>
                    <InfoLink href="mailto:aghiles.kebaili@univ-rouen.fr" $isDarkMode={isDarkMode}>
                      aghiles.kebaili@univ-rouen.fr
                    </InfoLink>
                  </InfoBox>
                </div>
              </div>
              <LocationFootnote>
                Université de Rouen Normandie <br />Rouen, France
              </LocationFootnote>
            </InfoPanel>

            <FormContainer>
              <PanelTitle $isDarkMode={isDarkMode}>Send a message</PanelTitle>
              
              {submitSuccess ? (
                <SuccessBox $isDarkMode={isDarkMode}>
                  <SuccessTitle $isDarkMode={isDarkMode}>Message envoyé avec succès !</SuccessTitle>
                  <SuccessText $isDarkMode={isDarkMode}>Merci pour votre message. Je vous répondrai dans les plus brefs délais.</SuccessText>
                  <ResetButton onClick={() => setSubmitSuccess(false)} $isDarkMode={isDarkMode}>
                    Send another message
                  </ResetButton>
                </SuccessBox>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormGrid>
                      <FieldWrapper>
                        <FormLabel>Name</FormLabel>
                        <FormInput 
                          $isDarkMode={isDarkMode} 
                          type="text" 
                          required 
                          value={contactName} 
                          onChange={(e) => setContactName(e.target.value)} 
                          placeholder="Your name" 
                          name="name"
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <FormLabel>Email</FormLabel>
                        <FormInput 
                          $isDarkMode={isDarkMode} 
                          type="email" 
                          required 
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)} 
                          placeholder="your.email@example.com"
                          name="email" 
                        />
                      </FieldWrapper>
                    </FormGrid>
                    
                    <FieldWrapper>
                      <FormLabel>Subject</FormLabel>
                      <FormInput 
                        $isDarkMode={isDarkMode} 
                        type="text" 
                        required 
                        value={contactSubject} 
                        onChange={(e) => setContactSubject(e.target.value)} 
                        placeholder="Subject of your message"
                        name="subject" 
                      />
                    </FieldWrapper>
                    
                    <FieldWrapper>
                      <FormLabel>Message</FormLabel>
                      <FormTextArea 
                        $isDarkMode={isDarkMode} 
                        required 
                        rows="4" 
                        value={contactMessage} 
                        onChange={(e) => setContactMessage(e.target.value)} 
                        placeholder="Write your research inquiries or message here..."
                        name="message" 
                      />
                    </FieldWrapper>
                    
                    <SubmitButton type="submit" disabled={isSubmitting} $isDarkMode={isDarkMode}>
                      {isSubmitting ? 'Sending...' : 'Submit Message'}
                    </SubmitButton>
                  </FormGroup>
                </form>
              )}
            </FormContainer>
          </BentoContact>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <ConclusionBox $isDarkMode={isDarkMode}>
            <ConclusionTitle $isDarkMode={isDarkMode}>
              Let's build the future of medicine together.
            </ConclusionTitle>
            <ConclusionText $isDarkMode={isDarkMode}>
              I am continuously open to opportunities for clinical research collaborations, advanced engineering, or open-source projects. If you are looking for a passionate research engineer to design robust, ethical, and clinically applicable pipelines, feel free to reach out.
            </ConclusionText>
          </ConclusionBox>
        </ScrollReveal>

      </Container>
    </Section>
  );
}