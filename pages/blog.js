import Link from "next/link";
import Parser from "html-react-parser";
import Header from "../src/Containers/Header";
import Layout from "../src/Containers/Layout";
import Footer from '../src/Containers/Footer'
import SocialMediaNav from "../src/Components/SocialMediaNav";
import ParticlesNetwork from "../src/Components/ParticlesNetwok";
import SectionWrapper from "../src/Containers/SectionWrapper";

const md = require("markdown-it")();
const mk = require("markdown-it-katex");
md.use(mk, { throwOnError: false, errorColor: " #cc0000" });

const blog = () => (
    <div className="App">
        <Header minimal/>
		<Layout>
			<SocialMediaNav />
            <ParticlesNetwork />
			<SectionWrapper id="blog-homepage" offset={0} minHeight="90vh" invert>
				Still in construction
			</SectionWrapper>
		</Layout>
		<Footer />
    </div>
);

export default blog;
