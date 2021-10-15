import React from 'react'
import Header from "../src/Containers/Header";
import Layout from "../src/Containers/Layout";
import Footer from '../src/Containers/Footer'
import SocialMediaNav from "../src/Components/SocialMediaNav";
import ParticlesNetwork from "../src/Components/ParticlesNetwok";
import SectionWrapper from "../src/Containers/SectionWrapper";
import Post from "../src/Containers/Post"
import ToggleButton from "../src/Components/ToggleButton";

const blog = () => {
	const [enableParticles, setEnableParticles] = React.useState(true);
    React.useEffect(() => console.log('loaded'), [])

    return (
		<div className="App">
        <Header blog/>
		<Layout blog>
			<SocialMediaNav />
            <ParticlesNetwork enableParticles={enableParticles}/>
            <ToggleButton checked={enableParticles} onClick={() => setEnableParticles(!enableParticles)}/>
			<SectionWrapper id="blog-homepage" offset={0} minHeight="90vh">
				<Post />
			</SectionWrapper>
		</Layout>
		<Footer />
    </div>
	)
};

export default blog;
