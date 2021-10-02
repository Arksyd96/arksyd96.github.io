import React from "react";
import styled from "@emotion/styled"
import KeywordsSphere from "./KeywordsSphere";
import Title from "./Title";
import SectionWrapper from '../Containers/SectionWrapper'
import _Aux from "../HOC/_Aux"
import { Curric } from '../static-data'

const Layout = styled.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    boxShadow: "0px 0px 4px 4px rgba(150, 150, 150, 0.35)",
    backdropFilter: "blur(6px)",
    width: "100%",
    borderRadius: "5px",
    padding: "1vw 2vw",
    boxSizing: "border-box"
});

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
`;

const List = styled.ul({
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    listStyle: "none",
    position: "relative",
});

const Icons = styled.ul({
    display: "flex",
    flexDirection: "row",
    padding: 0,
    opacity: '0.8'
})

const Icon = styled.li`
    display: flex;
    alignItems: center;
    list-style: none;
    margin: 10px 5vw 10px 0px;
    :before {
        content: '';
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
`

const Curriculum = () => {
    return (
        <SectionWrapper id="curriculum" offset={320} minHeight="110vh" apply>
            <Title number="1" color="#FFFFFF">Curriculum</Title>
            <Layout>
                <List>
                    {Curric.map((item, index) => {
                        return (
                            <_Aux>
                                {index !== 0 ? <div style={{width: '100%', height: '0.5px', backgroundColor: 'orange', marginBottom: '5px'}}/> : null}
                                <Item key={index}>
                                    <h1
                                        style={{ margin: 0, fontSize: "1.5em" }}
                                    >
                                        {item.title}
                                    </h1>
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
                            </_Aux>
                        );
                    })}
                </List>
                <KeywordsSphere />
            </Layout>
        </SectionWrapper>
    );
};

export default Curriculum;
