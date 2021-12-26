import React from "react";
import styled from "@emotion/styled";
import Header from "../../src/Containers/Header";
import Layout from "../../src/Containers/Layout";
import Footer from "../../src/Containers/Footer";
import SocialMediaNav from "../../src/Components/SocialMediaNav";
import ParticlesNetwork from "../../src/Components/ParticlesNetwok";
import SectionWrapper from "../../src/Containers/SectionWrapper";
import ToggleButton from "../../src/Components/ToggleButton";
import Link from "next/link";

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

    const test = require("../../static-data/posts.json");

    return (
        <div className="App">
            <Header blog />
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
                            <Link href={`/blog/${post_meta.id}`} key={index}>
                                <a>{post_meta.id}</a>
                            </Link>
                        ))}
                    </ArticlesList>
                </SectionWrapper>
            </Layout>
            <Footer />
        </div>
    );
};

export async function getServerSideProps(context) {
    return {
        props: {}
    };
}

export default blog;
