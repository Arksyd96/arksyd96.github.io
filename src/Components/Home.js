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
    opacity: 0.9;
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
        opavity: 0.5;
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
        <SectionWrapper id="home" offset={0} minHeight="100vh" invert apply>
            <Hey>Hey, i'm</Hey>
            <Name>Kebaili Aghiles</Name>
            <Description>
                I'm a machine learning and artificial intelligence engineer specialized 
                in deep learning and computer vision models (and occasionally working 
                on web development and designing). I'm currently working on an implementation of a {' '}
                <Link href="https://medium.com/wisio/a-gentle-introduction-to-doc2vec-db3e8c0cce5e"
                    target="_blank">
                    doc2vec word embedding model
                </Link>
                .
            </Description>
            <br />
            <Button 
                newtab 
                /* link={base64EncodedPDF === undefined ? null : }  */
                label="Resume"
            />
        </SectionWrapper>
    );
};

export default Home;
