import React from "react";
import styled from "@emotion/styled";

const Toggle = styled.input`
    appearance: none;
    cursor: pointer;
    :focus {
        outline: none;
    }
    height: 32px;
    width: 52px;
    border-radius: 16px;
    display: inline-block;
    position: absolute;
    top: 12vh;
    right: 15px;
    margin: 0;
    border: 2px solid #474755;
    background: white;
    transition: all 0.2s ease;
    z-index: -1;
    :after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: black;
        box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
        transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
    }
    :checked {
        border-color: orange;
        background-color: orange;
        :after {
            background: white;
            transform: translatex(20px);
        }
    }
    @media (max-width: 768px) {
        top: 8vh;
        left: 15px;
    }
`;

const ToggleButton = props => {
    return <Toggle type="checkbox" defaultChecked={true} onClick={props.onClick}/>;
};

export default ToggleButton;
