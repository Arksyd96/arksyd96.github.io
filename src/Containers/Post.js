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
    background-color: transparent;
    width: 100%;
    padding: 4vh 4vw;
    margin: 10vh 0 10vw 0;
    box-sizing: border-box;
    @media (max-width: 768px) {
        font-size: 0.4em;
        margin: 10vh 0 10vh 0;
    }
`;

const TextWrapper = styled.div`
    color: #333;
    font-size: 18px;
    text-align: justify;
    line-height: 1.25;
`;

const Log = styled.div`
    border: 1px solid #ccc;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 2vh 2vw 0 2vw;
`;

const FixedImage = styled.img`
    height: auto;
    max-width: 100%;
    display: block;
`;

const Post = (props) => {
    return (
        <Layout className="blog-font">
            {props.object.cells.map((cell, index) =>
                cell.cell_type === "markdown" ? (
                    <TextWrapper className="article-styles" key={index}>
                        {Parser(md.render(cell.source.join("")))}
                    </TextWrapper>
                ) : (
                    <React.Fragment key={index}>
                        <Log><Lowlight language="python" value={cell.source.join("")}/></Log>
                        {cell.outputs.map((output, index) =>
                            (output.output_type === "display_data" || output.output_type === "execute_result") ? (
                                <ImageWrapper key={index}>
                                    <FixedImage
                                        src={
                                            "data:image/png;base64," +
                                            output.data["image/png"]
                                        }
                                        key={index}
                                    />
                                </ImageWrapper>
                            ) : (
                                output.output_type === "stream" ? (
                                    <Lowlight key={index} language="python" value={output.text.join("")} />
                                ) : null
                            )
                        )}
                    </React.Fragment>
                )
            )}
        </Layout>
    );
};

export default Post;
