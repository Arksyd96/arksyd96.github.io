import styled from "@emotion/styled";
import Link from "next/link";
import React, { useEffect } from "react";

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    height: 10vh;
    padding: 0 10%;
    box-sizing: border-box;
    align-self: center;
    transition: all 0.5s ease;
    backdrop-filter: blur(6px);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
        rgba(80, 80, 80, 0.3) 0px 8px 16px -8px;
    background-color: rgba(20, 20, 20, 0.5);
    z-index: 11;
    @media (max-width: 768px) {
        padding: 0 5%;
        height: 6vh;
    }
`;

const List = styled.ul({
    display: "flex",
    listStyle: "none",
    flexDirection: "row",
});

const Logo = styled.div`
    display: flex;
    width: 8%;
    height: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;
`;

const Anchor = styled.a`
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;
    transition: width 0.5s ease, color 0.5s ease;
    cursor: pointer;
    margin-left: 30px;
    :hover {
        color: orange;
    }
    :before {
        content: "${(props) => props.number}. ";
        color: orange;
    }
`;

const Header = (props) => {
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        }
    }, []);

    const scrollToHome = () => {
        window.scrollTo(0, 0);
    };

    return (
        <HeaderWrapper>
            <Logo className="logo-container" onClick={scrollToHome} />
            <nav>
                <List>
                    {props.blogMode ? (
                        isMobile ? null : (
                            <Link href="/">
                                <Anchor number="1">Home</Anchor>
                            </Link>
                        )
                    ) : isMobile ? null : (
                        <React.Fragment>
                            <Anchor number="1" href="#curriculum">
                                Curriculum
                            </Anchor>
                            <Anchor number="2" href="#projects">
                                Projects
                            </Anchor>
                            <Anchor number="3" href="#contact">
                                Contact
                            </Anchor>
                            <Link href="/blog">
                                <Anchor number="4">Blog</Anchor>
                            </Link>
                        </React.Fragment>
                    )}
                </List>
            </nav>
        </HeaderWrapper>
    );
};

export default Header;
