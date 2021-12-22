import React from "react";
import styled from "@emotion/styled";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import Parser from "html-react-parser";
const md = require("markdown-it")();
const mk = require("markdown-it-katex");
md.use(mk, { throwOnError: false, errorColor: " #cc0000" });

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
    background-color: rgba(220, 220, 220, 0.88);
    box-shadow: 0px 0px 4px 4px rgba(150, 150, 150, 0.35);
    backdrop-filter: blur(6px);
    width: 100%;
    border-radius: 5px;
    padding: 2vh 4vw;
    box-sizing: border-box;
    margin: 15vh 0 10vh 0;
`;

const editorStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "5px",
    fontSize: "1em",
    margin: "0 2vw 0 2vw",
}

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 2vh 2vw 0 2vw;
`

const Post = props => {
    // getting the post from the url
    const post = require(`../../static-data/posts/${props.filename}.json`);

    return (
        <Layout>
            {post.cells.map((cell, index) =>
                cell.cell_type === "markdown" ? (
                    <div key={index}>
                        {Parser(md.render(cell.source.join("")))}
                    </div>
                ) : (
                    <React.Fragment key={index}>
                        <SyntaxHighlighter
                            showLineNumbers
                            language="python"
                            style={vs}
                            key={index}
                            customStyle={editorStyle}
                        >
                            {cell.source.join("")}
                        </SyntaxHighlighter>
                        {cell.outputs.map((output, index) =>
                            output.output_type === "display_data" ? (
                                <ImageWrapper key={index}>
                                    <img src={'data:image/png;base64,' + output.data["image/png"]} key={index} style={{width: '100%'}}/>
                                </ImageWrapper>
                            ) : ( // stream
                                <SyntaxHighlighter 
                                    language='cal'
                                    style={vscDarkPlus}
                                    key={index}
                                    customStyle={{margin: "2vh 2vw 0 2vw", borderRadius: "5px", backgroundColor: "rgba(0, 0, 0, 0.5)"}}
                                >
                                    {output.text.join('')}
                                </SyntaxHighlighter>
                            )
                        )}
                    </React.Fragment>
                )
            )}
        </Layout>
    );
};

export default Post;
