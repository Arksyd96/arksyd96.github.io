import React from "react";
/* import PostWrapper from "../../src/Containers/Post"; */
import Header from "../../src/Containers/Header";
import Layout from "../../src/Containers/Layout";
import Footer from "../../src/Containers/Footer";
import SocialMediaNav from "../../src/Components/SocialMediaNav";
/* import ParticlesNetwork from "../../src/Components/ParticlesNetwok"; */
import SectionWrapper from "../../src/Containers/SectionWrapper";
/* import ToggleButton from "../../src/Components/ToggleButton"; */
import "katex/dist/katex.min.css";

import "react-ipynb-renderer/dist/styles/grade3.css";
import { IpynbRenderer } from "react-ipynb-renderer";

import { promises as fs } from "fs";
import path from "path";
import styled from "@emotion/styled";

const NotebookWrapper = styled.div`
    width: 100%;
    font-size: 0.9em;
    box-sizing: border-box;
    margin: 15vh 0 10vh 0;
    @media (max-width: 768px) {
        font-size: 0.4em;
        margin: 10vh 0 10vh 0;
    }
`;


const Post = (props) => {
    /* const [enableParticles, setEnableParticles] = React.useState(true); */

    return (
        <div className="App">
            <Header blog />
            <Layout blog>
                <SocialMediaNav />
                {/*  <ParticlesNetwork enableParticles={enableParticles} />
                <ToggleButton
                    checked={enableParticles}
                    onClick={() => setEnableParticles(!enableParticles)}
                /> */}
                <SectionWrapper id="blog-homepage" offset={0} minHeight="90vh">
                    {/* <PostWrapper object={props.body} /> */}
                    <NotebookWrapper>
                        <IpynbRenderer
                            ipynb={props.body}
                            syntaxTheme="solarizedlight"
                            language="python"
                            bgTransparent={true}
                        />
                    </NotebookWrapper>
                </SectionWrapper>
            </Layout>
            <Footer />
        </div>
    );
};

export async function getStaticPaths() {
    const postsDirectory = path.join(
        process.cwd(),
        "static-data",
        "posts.json"
    );
    const posts = JSON.parse(await fs.readFile(postsDirectory, "utf8"));
    return {
        paths: posts.map((post) => ({ params: { post: post.id } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postsDirectory = path.join(
        process.cwd(),
        "static-data",
        "posts.json"
    );
    const posts = JSON.parse(await fs.readFile(postsDirectory, "utf8"));
    const post = posts.find((post) => post.id === params.post);
    return {
        props: {
            body: post.body,
        },
    };
}

export default Post;
