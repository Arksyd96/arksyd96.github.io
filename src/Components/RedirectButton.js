import React from 'react'
import styled from '@emotion/styled'

const Button = styled.div`
    width: 1.5em;
    height: 1.5em;
    display: flex;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: ${props => props.hovered ? '1' : '0.6'};
    transition: opacity 0.2s ease-in-out;
`;

const RedirectButton = (props) => {
    return <Button hovered={props.hovered} className="redirect-container"><a href={props.link}></a></Button>
} 

export default RedirectButton