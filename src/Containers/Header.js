import styled from "@emotion/styled";
import Link from 'next/link'

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
    alignSelf: "center",
    transition: "all .5s ease",
    backdropFilter: "blur(6px)",
    boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(80, 80, 80, 0.3) 0px 8px 16px -8px",
    backgroundColor: "rgba(20, 20, 20, 0.5)",
    zIndex: "11",
});

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
    color: #FFFFFF;
    text-decoration: none;
    font-weight: bold;
    transition: width .5s ease, color .5s ease;
    cursor: pointer;
    margin-left: 30px;
    :hover {
        color: orange;
    }
    :before {
        content: '${props => props.number}. ';
        color: orange;
    }
`

const Header = () => {
    const scrollToHome = () => {
        window.scrollTo(0, 0);
    };

    return (
        <HeaderWrapper>
            <Logo className="logo-container" onClick={scrollToHome} />
            <nav>
                <List>
                    <Anchor number='1' href="#curriculum">Curriculum</Anchor>
                    <Anchor number='2' href="#projects">Projects</Anchor>
                    <Anchor number='3' href='#contact'>Contact</Anchor>
                    <Link href='/blog'><Anchor number='4'>Blog</Anchor></Link>
                </List>
            </nav>
        </HeaderWrapper>
    );
};

export default Header;
