import React from "react";
import Styled from "@emotion/styled";
import Button from "./Button";
import SectionWrapper from '../Containers/SectionWrapper'

const Name = Styled.h1`
    font-weight: 700;
    font-size: 4em;
    margin: 0.3em 0;
    @media (max-width: 768px) {
        font-size: 2.5em;
    }
`;

const Hey = Styled.span`
    font-size: 1.5em;
    @media (max-width: 768px) {
        font-size: 1.2em;
    }
`;

const Description = Styled.p`
    opacity: 1;
    width: 60%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Link = Styled.a`
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
    color: orange;
    font-weight: bold;
    :after {
        content: "";
        display: block;
        position: relative;
        height: 1px;
        width: 0%;
        background-color: orange;
        transition: width 0.5s ease;
    }
    :hover:after {
        width: 100%;
    }
`;

const Home = () => {
    return (
        <SectionWrapper id="home" offset={0} minHeight="90vh" invert apply color="transparent">
            <Hey>Hey, i'm</Hey>
            <Name>Kebaili Aghiles</Name>
            <Description>
                I'm a machine learning and artificial intelligence research scientist specialized in deep learning and computer vision models, currently pursuing a Ph.D. in medical imaging at{' '}
                <Link href="https://www.becquerel.fr" target="_blank">Henri Becquerel Cancer Center</Link> 
                and the University of Rouen-Normandy, France.<br />
                
                I'm mainly interested in generative models, especially diffusion models for augmenting multimodal MRI data. You can check out my publications{' '}
                <Link href="https://scholar.google.fr/citations?user=Sp3Q6LQAAAAJ&hl=fr" target="_blank">here</Link>.
            </Description>
            <br />
            <Button
                newtab 
                orange
                link={'https://www.linkedin.com/in/aghiles-kebaili/'} 
                label="LinkedIn"
            />
        </SectionWrapper>
    );
};

export default Home;
