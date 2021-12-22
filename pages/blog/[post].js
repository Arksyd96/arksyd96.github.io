import React, { useEffect } from "react";
import PostWrapper from "../../src/Containers/Post";
import Header from "../../src/Containers/Header";
import Layout from "../../src/Containers/Layout";
import Footer from "../../src/Containers/Footer";
import SocialMediaNav from "../../src/Components/SocialMediaNav";
import ParticlesNetwork from "../../src/Components/ParticlesNetwok";
import SectionWrapper from "../../src/Containers/SectionWrapper";
import ToggleButton from "../../src/Components/ToggleButton";

const Post = () => {
    // const router = useRouter();
    // const { post } = router.query;
    const [filename, setFilename] = React.useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log(window.location.href);
            let post = window.location.href.split("/blog/")[1];
            setFilename(post);
        }
    }, []);

    const [enableParticles, setEnableParticles] = React.useState(true);

    return (
        <div className="App">
            <Header blog />
            <Layout>
                <SocialMediaNav />
                <ParticlesNetwork enableParticles={enableParticles} />
                <ToggleButton
                    checked={enableParticles}
                    onClick={() => setEnableParticles(!enableParticles)}
                />
                <SectionWrapper id="blog-homepage" offset={0} minHeight="90vh">
                    {filename !== '' ? <PostWrapper filename={filename} /> : 'Loading...'}
                </SectionWrapper>
            </Layout>
            <Footer />
        </div>
    );
};

export default Post;
