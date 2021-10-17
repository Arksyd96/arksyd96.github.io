import React from "react";
import styled from "@emotion/styled";

const ButtonStyled = styled.a`
    width: 10vw;
    min-width: 100px;
    padding: 0.5em 1.2em;
    border: 0.1em solid ${props => props.orange ? `orange` : `#FFFFFF`};
    border-radius: 0.15em;
    text-decoration: none;
    font-weight: 300;
    background: ${props => props.orange ? `orange` : `transparent`};
    color: ${props => props.orange ? `#000000` : `#FFFFFF`};
    opacity: ${props => props.orange ? `0.5` : `1`};
    text-align: center;
    box-sizing: border-box;
    transition: all 0.2s;
    cursor: pointer;
    ${props => props.center && `align-self: center;`}
    :hover {
        color: #000000;
        background-color: orange;
        border: 0.1em solid orange;
        opacity: 1;
    }
    @media (max-width: 768px) {
        width: 100%;
        color: #000000;
        background-color: orange;
        border: 0.1em solid orange;
        opacity: 1;
    }
`;


const Button = props => {
    return <ButtonStyled orange={props.orange} center={props.center} href={props.link} target={props.newtab ? "_blank" : null}
        onClick={props.onClick} style={props.style}>
        {props.label}
    </ButtonStyled>;
};

export default Button;
