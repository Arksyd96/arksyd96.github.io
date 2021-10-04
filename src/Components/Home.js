import React from "react";
import Styled from "@emotion/styled";
import Button from "./Button";
import SectionWrapper from '../Containers/SectionWrapper'
// import PDF from '../assets/kebaili_aghiles_curriculum_vitae.pdf'

const Name = Styled.h1({
    fontWeight: "700",
    fontSize: "4em",
    margin: "0.3em 0",
});

const Hey = Styled.span({
    fontSize: "1.5em",
});

const Description = Styled.p({
    opacity: "0.9",
    width: "60%",
});

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
        <SectionWrapper id="home" offset={0} minHeight="90vh" invert>
            <Hey>Hey, i'm</Hey>
            <Name>Kebaili Aghiles</Name>
            <Description>
            I'm a machine learning and artificial intelligence engineer specialized 
            in deep learning and computer vision models (and occasionally working 
            on web development and designing). I'm currently working on an implementation of a &nbsp;
                <Link href="https://medium.com/egen/region-proposal-network-rpn-backbone-of-faster-r-cnn-4a744a38d7f9"
                    target="_blank">
                    region proposal network
                </Link>
                .
            </Description>
            <br />
            <Button newtab /* link={PDF} */ label="Resume" />
        </SectionWrapper>
    );
};

export default Home;
