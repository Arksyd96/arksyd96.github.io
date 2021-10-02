import React from "react";
import Styled from "@emotion/styled";

const Ref = Styled.a`
    color: #FFFFFF;
    text-decoration: none;
    font-weight: bold;
    transition: width .5s ease, color .5s ease;
    :hover {
        color: orange;
    }
    :before {
        content: '${props => props.number}. ';
        color: orange;
    }
`

const Li = Styled.li`
    padding-bottom: 5px;
    margin: 0 1.5em;
`;

const Link = (props) => {
    return (
        <Li><Ref number={props.number} href={props.link}>{props.children}</Ref></Li>
    );
};

export default Link;
