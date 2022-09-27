import React from 'react'
import styled from '@emotion/styled'

const FooterWrapper = styled.footer`
    display: flex;
    width: 100%;
    height: 10vh;
    background: black;
    color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px -13px 27px -5px, rgba(80, 80, 80, 0.3) 0px -8px 16px -8px;
    align-items: center;
    font-size: 0.8rem;
    letter-spacing: 0.1rem;
    justify-content: center;
`

const Footer = props => {
    return <FooterWrapper>
        Copyrigth &copy; Kebaili Aghiles 2022
    </FooterWrapper>
}

export default Footer