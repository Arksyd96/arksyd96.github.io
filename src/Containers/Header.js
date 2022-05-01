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

const List = styled.ul`
    display: flex;
    list-style: none;
    flex-direction: row;
`;

const Logo = styled.div`
    display: flex;
    width: 10%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;
    @media (max-width: 1024px) {
        width: 15%;
    }
    @media (max-width: 768px) {
        width: 20%;
    }
`;

const Anchor = styled.a`
    color: #FFFFFF;
    text-decoration: none;
    font-weight: bold;
    transition: width 0.5s ease, color 0.5s ease;
    cursor: pointer;
    margin-left: 30px;
    :hover {
        color: orange;
    }
    :before {
        color: orange;
        content: "${(props) => props.number !== undefined ? props.number + ". " : ""}";
    }
    @media (max-width: 768px) {
        font-size: 1.8rem;
        font-weight: normal;
        margin: 10px;
    }
`;

const DropdownButton = styled.div`
    background-color: transparent;
    transform: ${(props) => (props.isOpen ? "rotate(0deg)" : "rotate(90deg)")};
    transition: all 0.2s ease;
    :after {
        content: "\\2807";
        position: relative;
        right: -5px;
        font-size: 2.5em;
        font-weight: bold;
        color: #ffffff;
    }
`;

const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 8vh;
    right: 15px;
    width: 60vw;
    background-color: rgba(50, 50, 50, 0.6);
    box-shadow: 0px 0px 4px 4px rgba(150, 150, 150, 0.35);
    backdrop-filter: blur(6px);
    border-radius: 2px;
    padding: 1vw;
    box-sizing: border-box;
    transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(120%)")};
    transition: all 0.5s ease;
`;

const Header = (props) => {
    const [isMobile, setIsMobile] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        }

    }, []);

    const scrollToHome = () => {
        window.scrollTo(0, 0);
    };

    return (
        <HeaderWrapper style={props.isVisible ? {} : {transform: "translateY(-100%)"}}>
            <Logo className="logo-container" onClick={scrollToHome} />
            <nav>
                <List>
                    {props.blog ? (
                        isMobile ? null : (
                            <Link href="/">
                                <Anchor number="1">Home</Anchor>
                            </Link>
                        )
                    ) : isMobile ? (
                        <React.Fragment>
                            <DropdownButton
                                isOpen={isOpen}
                                onClick={() => setIsOpen(!isOpen)}
                            />
                            <Dropdown isOpen={isOpen}>
                                <Anchor href="https://github.com/Arksyd96">
                                    My Github
                                </Anchor>
                                <Anchor href="https://www.linkedin.com/in/aghiles-kebaili/">
                                    LinkedIn
                                </Anchor>
                                <Anchor href="#contact">
                                    Contact me
                                </Anchor>
                                <Anchor href="/blog">
                                    Blog
                                </Anchor>
                            </Dropdown>
                        </React.Fragment>
                    ) : (
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
