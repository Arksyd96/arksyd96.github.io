import styled from "@emotion/styled";
import Link from "../Components/Link";

const HeaderWrapper = styled.header({
    position: "fixed",
    top: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    height: "10vh",
    padding: "0 10%",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    alignSelf: "center",
    transition: "all .5s ease",
    zIndex: 10,
});

const blurryHeader = {
    backdropFilter: "blur(6px)",
    boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(80, 80, 80, 0.3) 0px 8px 16px -8px",
    backgroundColor: "rgba(20, 20, 20, 0.5)",
    zIndex: "11",
};

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

const Header = () => {
    const scrollToHome = () => {
        window.scrollTo(0, 0);
    };

    return (
        <HeaderWrapper style={/* blurry ?  */ blurryHeader /*  : null */}>
            <Logo className="logo-container" onClick={scrollToHome} />
            <nav>
                <List>
                    <Link number="1" link="#curriculum">Curriculum</Link>
                    <Link number="2" link="#projects">Projects</Link>
                    <Link number="3" link="#contact">Contact</Link>
                    <Link number="4" disable>Blog</Link>
                </List>
            </nav>
        </HeaderWrapper>
    );
};

export default Header;
