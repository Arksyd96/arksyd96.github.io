import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: ${(props) => (props.invert ? "-50px" : "50px")};
    color: #ffffff;
    min-height: ${(props) => props.minHeight};
    opacity: 0;
    transition: all 0.6s ease-in-out;
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
            if (window.scrollY >= props.offset) setIsVisible(true);
        },
        [props.offset]
    );

    useEffect(() => {
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
        >
            {props.children}
        </Section>
    );
};

export default SectionWrapper;
