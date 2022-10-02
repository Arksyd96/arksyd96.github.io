import React from "react";
import Styled from '@emotion/styled'

const StyledLayout = Styled.main`
    margin: 0;
    box-sizing: border-box;
`;

const Layout = (props) => {
    return (
        <StyledLayout>
            {props.children}
        </StyledLayout>
    )       
};

export default Layout;
