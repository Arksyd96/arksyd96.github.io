import React, { useState, useEffect } from 'react'
import Header from '../src/Containers/Header'
import Body from '../src/Containers/Body'
import Footer from '../src/Containers/Footer'

const App = () => {
    const [isVisible, setIsVisible] = useState(true)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
        })
    })

    return (
        <div className="App">
            <Header isVisible={isVisible}/>
            <Body />
            <Footer />
        </div>
    );
};

export default App;


