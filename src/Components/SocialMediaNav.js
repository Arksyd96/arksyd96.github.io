import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const IconsWrapper = styled.div({
    position: "fixed",
    right: "15px",
    top: "40%",
    display: "flex",
    flexDirection: "column",
});

const Icon = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    width: 40px;
    height: 40px;
    text-decoration: none;
    margin: 5px 5px;
    background: transparent;
    border-radius: 100%;
    cursor: pointer;
    transition: background 0.1s ease-in;
    color: ${props => props.blog ? 'orange' : '#FFFFFF'};
    border: ${props => props.blog ? '1px solid orange' : '1px solid #FFFFFF'};
    :hover {
        background: ${props => props.blog ? 'transparent' : 'orange'};
        border: 1px solid orange;
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const Font = styled(FontAwesomeIcon)`
    color: ${props => props.blog ? 'orange' : '#FFFFFF'};
`;

const SocialMediaNav = props => {
    const links = [
        {href: 'mailto:aghiles.kebaili.1998@gmail.com', icon: faEnvelope},
        {href: 'https://www.linkedin.com/in/aghiles-kebaili/', icon: faLinkedin},
        {href: 'https://github.com/Arksyd96', icon: faGithub},
    ]

    return (
        <IconsWrapper>
            {links.map((link, index) => (
                <Icon blog={props.blog} key={index} href={link.href} target={index !== 0 ? '_blank' : ''}>
                    <Font blog={props.blog} icon={link.icon} />
                </Icon>
            ))}
        </IconsWrapper>
    );
};

export default SocialMediaNav;
