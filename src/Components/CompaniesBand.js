import React from "react";
import styled from "@emotion/styled";
import SectionWrapper from "../Containers/SectionWrapper";

const Container = styled.div`
    display: flex;
    background-color: white;
    width: 100%;
    flex-direction: row;
    min-height: 20vh;
    border-top: 2px solid #orange;
    border-bottom: 2px solid #orange;
    @media (max-width: 768px) {   
        min-height: 8vh;
    }
`;

const Logo = styled.div`
    width: 100%;
    margin: 0px 30px 0px 30px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    @media (max-width: 768px) {   
        margin: 0px 5px 0px 5px;
    }
`;

const logos = [
    "ubo_band-logo",
    "u_paris-logo",
    "stellantis_band-logo",
    "chb_band-logo",
    "aims-logo",
    "litis-logo"
];

const CompaniesBand = () => {
    return (
        <SectionWrapper id="band" offset={0} minHeight="8vh" color="white" companies>
            <Container>
                {logos.map((logo, index) => {
                    return <Logo className={logo} key={index}/>;
                })}
            </Container>
        </SectionWrapper>
    );
};

export default CompaniesBand;
