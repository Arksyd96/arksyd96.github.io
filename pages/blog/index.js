import React from "react";
import styled from "@emotion/styled";
import Header from "../../src/Containers/Header";
import Layout from "../../src/Containers/Layout";
import Footer from "../../src/Containers/Footer";
import SocialMediaNav from "../../src/Components/SocialMediaNav";
import SectionWrapper from "../../src/Containers/SectionWrapper";
import Link from "next/link";
import path from "path";
import { promises as fs } from "fs";

const PostsList = styled.ul`
    list-style: none;
    display: grid;
    justify-content: center;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, 27vw);
    transition: all 0.3s ease-in-out;
    margin: 20vh 0 10vh 0;
    padding: 0;
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, 100%);
    }
`;

const PostCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000000;
    background-color: #ffffff;
    /* border: 1px solid #000000; */
    box-shadow: 0px 2px 4px 4px rgba(230, 230, 230, 0.6);
    min-height: 35vh;
    padding: 15px;
    border-radius: 0.1em;
    box-sizing: border-box;
    overflow: hidden;
    margin: 10px;
    transition: transform 0.2s ease-in-out, box-shadow 0.3s ease-out;
    cursor: pointer;
    :hover {
        transform: translateY(-15px);
        box-shadow: 0px 4px 8px 8px rgba(190, 190, 190, 0.6);
    }
`;

const TagList = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
    flex-wrap: wrap;
`;

const Tag = styled.span`
    font-size: 0.8em;
    color: #000000;
    margin: 5px;
    padding: 0 5px;
    background-color: rgba(185, 185, 185, 0.8);
    text-transform: uppercase;
    white-space: nowrap;
`
const Description = styled.p`
    font-size: 1em;
`
const Title = styled.h3`
    font-size: 1.4em;
    margin-bottom: 5px;
`
const Date = styled.p`
    font-size: 0.9em;
    color: rgba(0, 0, 0, 0.8);
    margin: 0;
    padding: 0;
    text-align: center;
`

const blog = ({ postsMetadata }) => {
    const [isVisible, setIsVisible] = React.useState(true)
    let lastScroll = 0
    const handleScroll = () => {
        const currentScroll = window.scrollY
        setIsVisible(lastScroll > currentScroll || currentScroll < 400)
        lastScroll = currentScroll
    }

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScroll])

    return (
        <div className="App">
            <Header blog isVisible={isVisible}/>
            <Layout blog>
                <SocialMediaNav />
                <SectionWrapper id="blog-homepage" offset={0} minHeight="90vh">
                    <PostsList>
                        {postsMetadata.map((postMeta, index) => (
                            <Link href={`/blog/${postMeta.id}`} key={index}>
                                <PostCard>
                                    <Date>{postMeta.date}</Date>
                                    <Title>{postMeta.title}</Title>
                                    <Description>{postMeta.description}</Description>
                                    <TagList>
                                        {postMeta.tags.map((tag, index) => (
                                            <Tag key={index}>{tag}</Tag>
                                        ))}
                                    </TagList>
                                </PostCard>
                            </Link>
                        ))}
                    </PostsList>
                </SectionWrapper>
            </Layout>
            <Footer />
        </div>
    );
};

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), "static-data", "posts.json");
    const posts = JSON.parse(await fs.readFile(postsDirectory, "utf8"));
    const postsMetadata = posts.map(post => ({
        id: post.id,
        title: post.title,
        tags: post.tags,
        description: post.description,
        date: post.date,
    }));

    return {
        props: {
            postsMetadata: postsMetadata
        }
    };
}

export default blog;
