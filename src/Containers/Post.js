import React from "react";
import styled from "@emotion/styled";


import Parser from "html-react-parser";
const md = require("markdown-it")();
const mk = require("markdown-it-katex");
md.use(mk, { throwOnError: false, errorColor: " #cc0000" });

import Lowlight from "react-lowlight";
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github.css'
Lowlight.registerLanguage("python", python);

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
    background-color: transparent;
    width: 100%;
    padding: 2vh 4vw;
    margin: 10vh 0 6vh 0;
    box-sizing: border-box;
    @media (max-width: 768px) {
        font-size: 0.4em;
        margin: 10vh 0 10vh 0;
    }
`;

const Log = styled.div`
    border-top: 1px solid #ccc;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 2vh 2vw 0 2vw;
`;

const Post = (props) => {
    return (
        <Layout>
            {props.object.cells.map((cell, index) =>
                cell.cell_type === "markdown" ? (
                    <div key={index}>
                        {Parser(md.render(cell.source.join("")))}
                    </div>
                ) : (
                    <React.Fragment key={index}>
                        <Lowlight language="python" value={cell.source.join("")} />
                        {cell.outputs.map((output, index) =>
                            output.output_type === "display_data" ? (
                                <ImageWrapper key={index}>
                                    <img
                                        src={
                                            "data:image/png;base64," +
                                            output.data["image/png"]
                                        }
                                        key={index}
                                        style={{ width: "60%" }}
                                    />
                                </ImageWrapper>
                            ) : <Log><Lowlight language="python" value={output.text.join("")} /></Log>
                        )}
                    </React.Fragment>
                )
            )}
        </Layout>
    );
};

export default Post;
