import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Title from "../Components/Title";
import SectionWrapper from "./SectionWrapper";
import Project from "../Components/Project";
import Button from "../Components/Button";

const projects = require('../../static-data/projects.json')

const ProjectsList = styled.ul`
    list-style: none;
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, 25vw);
    transition: all 0.3s ease-in-out;
    margin: 0;
    padding: 0;
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, 100%);
    }
`;

const LI = styled.li`
    display: ${props => props.display ? 'list-item' : 'none'};
    transition: all 0.3s ease-in-out;
`

const Projects = () => {
    let defaultProjectsCount = 6;
    const [projectList, setProjectList] = useState([]);
    const [projectsCount, setProjectsCount] = useState(defaultProjectsCount);

    useEffect(() => {
        setProjectList(projects)
        if(window !== undefined) {
            if(window.innerWidth < 768) {
                defaultProjectsCount = 3;
                setProjectsCount(defaultProjectsCount)
            }
        }
    }, [])

    const handleProjectsNumber = () => {
        if(projectsCount === projectList.length) setProjectsCount(defaultProjectsCount)
        else {
            if(projectsCount + 3 > projectList.length) setProjectsCount(projectList.length)
            else setProjectsCount(projectsCount + 3)
        }
    }

    return (
        <SectionWrapper id="projects" offset={1100} minHeight="100vh" color='rgb(235, 235, 235)'>
            <Title number="2" color="orange">
                Projects
            </Title>
            <ProjectsList>
                {projectList.map((project, key) => {
                    return (
                        <LI key={key} display={key + 1 <= projectsCount ? true : false}>
                            <Project project={project}/>
                        </LI>
                    );
                })}
            </ProjectsList>
            <Button 
                orange
                label={projectsCount === projectList.length ? 'View less' : 'View more'} 
                onClick={handleProjectsNumber} 
                style={{marginTop: '20px', alignSelf: 'center', minWidth: '200px'}}
            />
        </SectionWrapper>
    );
};

export default Projects;
