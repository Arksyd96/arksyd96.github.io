import React, { useEffect } from "react";
import styled from "@emotion/styled";
import KeywordsSphere from "./KeywordsSphere";
import Title from "./Title";
import SectionWrapper from "../Containers/SectionWrapper";

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const curriculum = require("../../static-data/curriculum.json");

const Layout = styled.div`
    display: flex;
    flexdirection: row;
    background-color: transparent;
    box-shadow: 0px 0px 4px 4px rgba(150, 150, 150, 0.35);
    backdrop-filter: blur(6px);
    width: 100%;
    border-radius: 2px;
    padding: 1vw 2vw;
    box-sizing: border-box;
    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Item = styled.li`
    margin-bottom: 1em;
    color: white;
    :before {
        content: "▹";
        color: orange;
        position: absolute;
        left: 0px;
        font-size: 2em;
    }
    @media (max-width: 768px) {
        margin: 0.6em 0;
        :before {
            font-size: 1.5em;
            left: 2vw;
        }
    }
`;

const List = styled.ul({
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    listStyle: "none",
    position: "relative",
});

const Icons = styled.ul`
    display: flex;
    flex-direction: row;
    padding: 0;
    opacity: 0.8;
    @media (max-width: 768px) {
        font-size: 0.8em;
    }
`;

const Icon = styled.li`
    display: flex;
    alignitems: center;
    list-style: none;
    margin: 10px 5vw 10px 0px;
    :before {
        content: "";
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
`;

const ItemTitle = styled.h1`
    margin: 0;
    font-size: 1.8em;
    @media (max-width: 768px) {
        font-size: 1.2em;
        margin-bottom: 0.4em;
    }
`;

const Divider = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: orange;
    margin-bottom: 5px;
    @media (max-width: 768px) {
        width: 95%;
    }
`;

const Date = styled.span`
    font-weight: 700;
}`;

const Curriculum = () => {
    return (
        <SectionWrapper id="curriculum" offset={130} minHeight="110vh" color="rgb(237, 238, 239)">
            {/* <Title number="1" color="#FFFFFF">Curriculum</Title>
            <Layout>
                <List>
                    {curriculum.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                {index !== 0 ? <Divider /> : null}
                                <Item key={index}>
                                    <ItemTitle>{item.title}</ItemTitle>
                                    <span
                                        style={{
                                            color: "orange",
                                            marginBottom: 0,
                                        }}
                                    >
                                        {item.university}
                                    </span>
                                    <Icons>
                                        <Icon className="address-container">{item.location}</Icon>
                                        <Icon className="calendar-container">{item.date}</Icon>
                                    </Icons>
                                </Item>
                            </React.Fragment>
                        );
                    })}
                </List>
                <KeywordsSphere/>
            </Layout> */}
            <Title number="1" color="orange">
                Timeline
            </Title>
            <VerticalTimeline>
                {curriculum.map((item, index) => {
                    return (
                        <VerticalTimelineElement
                            key={index}
                            contentStyle={{
                                background: "transparent",
                                color: "#000000",
                            }}
                            contentArrowStyle={{ borderRight: "none" }}
                            date={<Date>{item.date}</Date>}
                            icon={<div className={'logo ' + item.logo} />}
                        >
                            <h1 style={{ color: "orange" }}>{item.title}</h1>
                            <h3>
                                {item.university}, {item.location}
                            </h3>
                            <p>{item.description}</p>
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>
        </SectionWrapper>
    );
};

export default Curriculum;
