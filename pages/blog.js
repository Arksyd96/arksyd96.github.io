import Header from "../src/Containers/Header";
import Layout from "../src/Containers/Layout";
import Footer from '../src/Containers/Footer'
import SocialMediaNav from "../src/Components/SocialMediaNav";
import ParticlesNetwork from "../src/Components/ParticlesNetwok";
import SectionWrapper from "../src/Containers/SectionWrapper";
import Post from "../src/Containers/Post"

const blog = () => (
    <div className="App">
        <Header minimal/>
		<Layout>
			<SocialMediaNav />
            <ParticlesNetwork />
			<SectionWrapper id="blog-homepage" offset={0} minHeight="90vh" invert>
				<Post />
			</SectionWrapper>
		</Layout>
		<Footer />
    </div>
);

export default blog;
