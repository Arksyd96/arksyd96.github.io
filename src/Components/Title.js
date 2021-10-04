import React from 'react'
import Styled from '@emotion/styled'

const Title = (props) => {
    const T = Styled.h1`
        color: ${props.color};
        font-weight: 500;
        font-size: 2.5em;
        margin-bottom: 50px;
        align-self: center;
        :before, :after {
            content: '';
            display: inline-block;
            position: relative;
            background: orange;
            opacity: 0.6;
            height: 1px;
            width: 20vw;
            margin: 0px 20px;
            top: -10px;
        }
`;
    return <T number={props.number}>{props.children}</T>
}

export default Title   