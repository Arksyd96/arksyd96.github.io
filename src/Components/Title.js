import React from 'react'
import Styled from '@emotion/styled'

const Title = (props) => {
    const T = Styled.h1`
        color: ${props.color};
        font-weight: 500;
        font-size: 3.5em;
        margin-bottom: 50px;
        align-self: center;
        :before, :after {
            content: '';
            display: inline-block;
            position: relative;
            background: ${props.color};
            opacity: 0.6;
            height: 2px;
            width: 20vw;
            margin: 0px 20px;
            top: -10px;
        }
        @media (max-width: 768px) {
            font-size: 1.5em;
            :before, :after {
                width: 10vw;
                margin: 0px 10px;
            }
        }
`;
    return <T color={props.color} number={props.number}>{props.children}</T>
}

export default Title   