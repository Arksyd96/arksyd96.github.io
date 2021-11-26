import React from "react";
import styled from "@emotion/styled";
import Header from "../src/Containers/Header";
import Layout from "../src/Containers/Layout";
import Footer from "../src/Containers/Footer";
import SocialMediaNav from "../src/Components/SocialMediaNav";
import ParticlesNetwork from "../src/Components/ParticlesNetwok";
import SectionWrapper from "../src/Containers/SectionWrapper";
// import Post from "../src/Containers/Post";
import Post from '../src/Components/Project'
import ToggleButton from "../src/Components/ToggleButton";
// import Card from "../src/Components/Card";
import Link from "next/link";
import { useRouter } from "next/router";

const test = require('../static-data/post_cards.json')

const ArticlesList = styled.ul`
    list-style: none;
    display: grid;
	justify-content: center;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, 30vw);
    transition: all 0.3s ease-in-out;
    margin: 0;
    padding: 0;
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, 100%);
    }
`;

const blog = () => {
    const [enableParticles, setEnableParticles] = React.useState(true);
    /* React.useEffect(() => console.log('loaded'), []) */

    return (
        <div className="App">
            <Header blog/>
            <Layout>
                <SocialMediaNav />
                <ParticlesNetwork enableParticles={enableParticles} />
                <ToggleButton
                    checked={enableParticles}
                    onClick={() => setEnableParticles(!enableParticles)}
                />
                <SectionWrapper id="blog-homepage" offset={0} minHeight="90vh">
                    <ArticlesList>
                        {test.map((post_meta, index) => (
                            <Link href={`/${post_meta.link}`} key={index}>
                                <a>test {post_meta.link}</a>
                            </Link>
                            
                        ))}
                    </ArticlesList>
                </SectionWrapper>
            </Layout>
            <Footer />
        </div>
    );
};

export default blog;