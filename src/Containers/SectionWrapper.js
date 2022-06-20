import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: ${(props) => (props.invert ? "-50px" : "50px")};
    color: ${(props) => (props.color ? "white" : "black")};
    min-height: ${(props) => props.minHeight};
    opacity: 0;
    transition: all 0.6s ease-in-out;
    background-color: ${(props) => props.color};
    padding: ${props => props.companies ? '0vh 10%' : (props.blog ? '5vh 20%' : '5vh 10%')};
    @media (max-width: 1024px) {
        padding: 0 5%;
    }
    @media (max-width: 768px) {
        top: ${(props) => (props.invert ? "-50px" : "200px")};
        min-height: ${(props) => props.minHeight};
    }
`;
const visible = {
    top: 0,
    opacity: 1,
};

const SectionWrapper = (props) => {
    // visibility of the section
    const [isVisible, setIsVisible] = useState(props.apply ? false : true);

    // show the section
    const showSectionHandler = useCallback(
        () => {
            let isItMobile = window.innerWidth < 768;
            if (window.scrollY >= props.offset - (isItMobile ? 200 : 0)) setIsVisible(true);
        }
    );

    useEffect(() => {
        if (props.id === 'home') setIsVisible(true);
        window.addEventListener("scroll", showSectionHandler);
        return () => {
            window.removeEventListener("scroll", showSectionHandler);
        };
    });

    return (
        <Section
            style={isVisible ? visible : null}
            invert={props.invert}
            minHeight={props.minHeight}
            id={props.id}
            color={props.color}
            companies={props.companies}
        >
            {props.children}
        </Section>
    );
};

export default SectionWrapper;
