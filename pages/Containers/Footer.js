import React from 'react'
import styled from '@emotion/styled'

const FooterWrapper = styled.footer`
    display: flex;
    width: 100%;
    height: 10vh;
    background: transparent;
    backdrop-filter: blur(4px);
    color: orange;
    box-shadow: rgba(50, 50, 93, 0.25) 0px -13px 27px -5px, rgba(80, 80, 80, 0.3) 0px -8px 16px -8px;
    align-items: center;
    justify-content: center;
`

const Footer = props => {
    return <FooterWrapper>Designed and built with ❤️ by Kebaili Aghiles.</FooterWrapper>
}

export default Footer