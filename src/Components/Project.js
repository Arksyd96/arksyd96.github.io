import React, { useState } from "react";
import styled from "@emotion/styled";
import RedirectButton from "./RedirectButton";

const ProjectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: transparent;
    box-shadow: 0px 0px 4px 4px rgba(150, 150, 150, 0.35);
    backdrop-filter: blur(8px);
    min-height: 50vh;
    border-radius: 2px;
    box-sizing: border-box;
    overflow: hidden;
    margin: 10px;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    :hover {
        transform: translateY(-10px);
    }
`;

const Description = styled.p`
    color: black;
    font-weight: 400;
    opacity: 0.8;
    padding: 5px 15px;
    position: relative;
    margin: 0px 0px 10px 0px;
    :before {
        content: '▹';
        position: absolute;
        left: -2px;
        color: orange;
    }
`

const Title = styled.h1`
    display: flex;
    align-items: center;
    font-size: 1.2em;
    margin: 0;
    min-height: 2.5em;
    color: darkorange;
`;

const TagsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;
const Tag = styled.span`
    color: darkorange;
    opacity: 0.6;
    font-size: 0.7em;
    margin-right: 5px;
    font-weight: 700;
`;
const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Project = (props) => {
    let { title, description, tags, thumbnail, link } = props.project

    const [hovered, setHovered] = useState(false);

    const redirect = () => {
        window.open(link, "_blank").focus();
    }

    return (
        <ProjectWrapper onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)} onClick={!props.post ? redirect : null}>
            <img
                src={thumbnail}
                alt="thumbnail"
                style={{
                    objectFit: "cover",
                    borderRadius: "5px",
                    maxHeight: "28vh",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, white 80%, black)",
                }}
            />
            <div style={{ padding: "15px", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '22vh' }}>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <Footer>
                    <TagsWrapper>
                        {tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                        ))}
                    </TagsWrapper>
                    {/* <RedirectButton link={link} hovered={hovered}/> */}
                </Footer>
            </div>
        </ProjectWrapper>
    );
};

export default Project;
