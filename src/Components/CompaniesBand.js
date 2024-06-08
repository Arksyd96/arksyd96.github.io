import React from "react";
import styled from "@emotion/styled";
import SectionWrapper from "../Containers/SectionWrapper";

const Container = styled.div`
    display: flex;
    background-color: white;
    width: 100%;
    flex-direction: row;
    min-height: 10vh;
    border-top: 2px solid #orange;
    border-bottom: 2px solid #orange;
`;

const Logo = styled.div`
    height: 200px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const logos = [
    "u_paris-logo",
    "ubo_band-logo",
    "chb_band-logo",
    "stellantis_band-logo",
    "litis-logo",
];

const CompaniesBand = () => {
    return (
        <SectionWrapper id="band" offset={0} minHeight="8vh" color="white" companies>
            <Container>
                {logos.map((logo, index) => {
                    return <Logo className={logo} key={index} style={{margin: '0px 30px 0px 30px'}}/>;
                })}
            </Container>
        </SectionWrapper>
    );
};

export default CompaniesBand;
