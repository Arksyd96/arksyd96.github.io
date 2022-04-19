import React from "react";
import Styled from '@emotion/styled'

const StyledLayout = Styled.main`
    margin: ${props => props.blog ? '0 2%' : '0 10%'};
    box-sizing: border-box;
    @media (max-width: 1024px) {
        margin: 0 5%;
    }
`;

const Layout = (props) => {
    return (
        <StyledLayout blog={props.blog}>
            {props.children}
        </StyledLayout>
    )       
};

export default Layout;
