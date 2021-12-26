import React, { useEffect } from "react";
import PostWrapper from "../../src/Containers/Post";
import Header from "../../src/Containers/Header";
import Layout from "../../src/Containers/Layout";
import Footer from "../../src/Containers/Footer";
import SocialMediaNav from "../../src/Components/SocialMediaNav";
import ParticlesNetwork from "../../src/Components/ParticlesNetwok";
import SectionWrapper from "../../src/Containers/SectionWrapper";
import ToggleButton from "../../src/Components/ToggleButton";
import fs from "fs";
import path from "path";

const Post = props => {
    const [enableParticles, setEnableParticles] = React.useState(true);

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
                    <PostWrapper object={props.body} />
                </SectionWrapper>
            </Layout>
            <Footer />
        </div>
    );
};

export async function getStaticProps({params}) {
    const id = params.post;
    const fileToRead = path.join(process.cwd(), 'static-data/posts.json')
    const data = JSON.parse(await fs.readFileSync(fileToRead))
    const post = data.find(post => post.id === id)
    return {
        props: {
            title: id,
            body: post.body
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            {params: {post: 'mes_notes_en_probabilites'}},
        ],
        fallback: false,
    };
}

export default Post;
