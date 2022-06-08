import React, { useState, useEffect } from 'react'
import Header from '../src/Containers/Header'
import Body from '../src/Containers/Body'
import Footer from '../src/Containers/Footer'

const App = () => {
    const [isVisible, setIsVisible] = React.useState(true)
    let lastScroll = 0
    const handleScroll = () => {
        const currentScroll = window.scrollY
        setIsVisible(lastScroll > currentScroll || currentScroll < 400)
        lastScroll = currentScroll
    }

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScroll])

    return (
        <div className="App">
            <Header isVisible={isVisible}/>
            <Body />
            <Footer />
        </div>
    );
};

export default App;


