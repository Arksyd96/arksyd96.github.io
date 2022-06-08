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

const Body = () => {
    const [enableParticles, setEnableParticles] = React.useState(true);
    useEffect(() => console.log('loaded'), [])

    return (
        <Layout>
            {/* <SocialMediaNav /> */}
            <ParticlesNetwork enableParticles={enableParticles}/>
            <ToggleButton checked={enableParticles} onClick={() => setEnableParticles(!enableParticles)}/>
            <Home />
            <CompaniesBand />
            <Curriculum />
            <Projects />
            <Contact />
        </Layout>
    );
};

export default Body;
