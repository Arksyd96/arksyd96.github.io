import React from "react";
import Styled from "@emotion/styled";

const IconsWrapper = Styled.div({
    position: "fixed",
    right: "15px",
    top: "40%",
    display: "flex",
    flexDirection: "column"
});

const Icon = Styled.a({
    fontSize: "18px",
    width: "40px",
    height: "40px",
    border: "1px solid #FFFFFF",
    textDecoration: "none",
    margin: "5px 5px",
    background: "transparent",
});

const SocialMediaNav = () => {
    const iconsMetaData = [
        { link: "mailto:aghiles.kebaili.1998@gmail.com", class: "fa fa-envelope" },
        { link: "https://www.linkedin.com/in/aghiles-kebaili/", class: "fa fa-linkedin" },
		{ link: "https://github.com/Arksyd96/", class: "fa fa-github" },
    ];

    return (
        <IconsWrapper>
			<style>
				{`
					.fa {
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 100%;
						color: white;
						transition: all 0.2s;
					}
					
					.fa:hover {
						color: #000000;
						background: orange;
                        border: 1px solid orange;
					}
				`}
			</style>
            {iconsMetaData.map((im, i) => (
                <Icon key={i} href={im.link} target="_blank" className={im.class}/>
            ))}
        </IconsWrapper>
    );
};

export default SocialMediaNav;
