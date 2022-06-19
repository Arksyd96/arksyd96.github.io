import React, { useEffect } from "react";
import Home from "../Components/Home";
import Layout from "./Layout";
import SocialMediaNav from "../Components/SocialMediaNav";
import ParticlesNetwork from "../Components/ParticlesNetwok";
import Curriculum from "../Components/Curriculum";
import Projects from "./Projects";
import Contact from "./Contact";
import ToggleButton from "../Components/ToggleButton";
import CompaniesBand from "../Components/CompaniesBand";
import Skills from "../Components/Skills";
import styled from "@emotion/styled";

const Body = () => {
    const [enableParticles, setEnableParticles] = React.useState(true);
    useEffect(() => console.log("loaded"), []);

    const Divider = styled.div`
        width: 100%;
        height: 2px;
        background-color: orange;
    `;

    return (
        <Layout>
            <ParticlesNetwork enableParticles={enableParticles} />
            <ToggleButton
                checked={enableParticles}
                onClick={() => setEnableParticles(!enableParticles)}
            />
            <Home />
            <Divider />
            <CompaniesBand />
            <Divider />
            <Curriculum />
            <Divider />
            <Skills />
            <Divider />
            <Projects />
            <Contact />
        </Layout>
    );
};

export default Body;
