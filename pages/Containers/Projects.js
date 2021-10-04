import React from "react";
import styled from "@emotion/styled";
import Title from "../Components/Title";
import SectionWrapper from "./SectionWrapper";
import Project from "../Components/Project";
import geStaticData from "../constants/static-data";

const ProjectsList = styled.ul`
    list-style: none;
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, 25vw);
    margin: 0;
    padding: 0;
`;
const Projects = () => {
    return (
        <SectionWrapper id="projects" offset={1100} minHeight="200vh" apply>
            <Title number="2" color="#FFFFFF">
                Projects
            </Title>
            <ProjectsList>
                {geStaticData(2).map((project, key) => {
                    return (
                        <li>
                            <Project key={key} item={project}/>
                        </li>
                    );
                })}
            </ProjectsList>
        </SectionWrapper>
    );
};

export default Projects;
