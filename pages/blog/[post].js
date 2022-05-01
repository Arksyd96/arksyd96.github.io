import React from "react";
import PostWrapper from "../../src/Containers/Post";
import Header from "../../src/Containers/Header";
import Layout from "../../src/Containers/Layout";
import Footer from "../../src/Containers/Footer";
import SocialMediaNav from "../../src/Components/SocialMediaNav";
import SectionWrapper from "../../src/Containers/SectionWrapper";

import "react-ipynb-renderer/dist/styles/grade3.css";
/* import { IpynbRenderer } from "react-ipynb-renderer"; */

import { promises as fs } from "fs";
import path from "path";

const Post = (props) => {
    const [isVisible, setIsVisible] = React.useState(true)
    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
        })
    })

    return (
        <div className="App">
            <Header blog isVisible={isVisible}/>
            <Layout blog>
                <SocialMediaNav blog />
                <SectionWrapper id="blog-homepage" offset={0} minHeight="90vh">
                    <PostWrapper object={props.body} />
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
