import React from "react";
import PostWrapper from "../../src/Containers/Post";
import Header from "../../src/Containers/Header";
import Layout from "../../src/Containers/Layout";
import Footer from "../../src/Containers/Footer";
import SocialMediaNav from "../../src/Components/SocialMediaNav";
import ParticlesNetwork from "../../src/Components/ParticlesNetwok";
import SectionWrapper from "../../src/Containers/SectionWrapper";
import ToggleButton from "../../src/Components/ToggleButton";

const posts = require('../../static-data/posts.json');

const Post = props => {
    const [enableParticles, setEnableParticles] = React.useState(true);

    const post = posts.find(post => post.id === props.title)  

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
                    <PostWrapper object={post.body} />
                </SectionWrapper>
            </Layout>
            <Footer />
        </div>
    );
};

export async function getStaticProps({params}) {
    const title = params.post
    return {
        props: {
            title: title
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
