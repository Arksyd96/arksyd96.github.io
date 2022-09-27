import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";

const StyledCanvas = styled.canvas`
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to bottom,  rgb(200, 211, 218) 0%, rgb(37, 61, 68));
`

const ParticlesNetwork = (props) => {
    // Variables related to the canvas
    const canvasRef = useRef(null);
    let canvas = null;
    let ctx = null;

    // Variables related to the particles
    const particles = [];
    let interactionParticle = null;
    const velocity = 30; // the higher the faster
    const density = 16000; // the lower the more particles
    const maxConnectionDistance = 110; // max distance between particles to create a connection
    let initialized = false;

    const newParticle = () => {
        const depthRate = 0.5 * (Math.random() + 1);
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: depthRate * (3.5 - 1.5) + 1.5,
            opacity: depthRate,
            color: `#3F3F3F`,
            velocity: {
                x: (Math.random() - 0.5) * velocity,
                y: (Math.random() - 0.5) * velocity,
            }
        };
    };

    const updateParticle = (particle, delta_time) => {
        // Change dir if outside map
        if (particle.x > canvas.width || particle.x < 0) {
            particle.velocity.x = -particle.velocity.x;
        }
        if (particle.y > canvas.height || particle.y < 0) {
            particle.velocity.y = -particle.velocity.y;
        }

        // Update position
        particle.x += particle.velocity.x * delta_time;
        particle.y += particle.velocity.y * delta_time;
    };

    const drawParticle = (particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
    };

    const drawConnections = (particle, index) => {
        for (let i = index + 1; i < particles.length; i++) {
            const other = particles[i];
            const dx = Math.abs(other.x - particle.x);
            const dy = Math.abs(other.y - particle.y);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const commonRadius = particle.radius + other.radius;
            if (distance <= maxConnectionDistance && distance > commonRadius) {
                ctx.beginPath();
                ctx.strokeStyle = particle.color;
                ctx.globalAlpha =
                    ((maxConnectionDistance - distance) /
                        maxConnectionDistance) *
                    particle.opacity *
                    other.opacity;
                ctx.lineWidth = 0.7;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        }
    };

    const createParticles = () => {
        const quantity =  props.enableParticles ? (canvas.width * canvas.height) / density : 0;
        // Creating new particles
        for (let i = 0; i < quantity; i++) {
            const particle = newParticle();
            particles.push(particle);
            
        }
        // Creating interactionParticle
        interactionParticle = newParticle();
        interactionParticle.color = "orange";
        interactionParticle.redius = 2.5;
        interactionParticle.opacity = 0.7;
        interactionParticle.velocity.x = 0;
        interactionParticle.velocity.y = 0;
        particles.push(interactionParticle);
    };

    // Update function
    let last_time = Date.now();
    const update = () => {
        // Clearing the canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        let current_time = Date.now();
        let delta_time = current_time - last_time;
        last_time = current_time;

        // Updating particles
        if (canvas) {
            // Drawing particles
            particles.forEach((particle, index) => {
                updateParticle(particle, delta_time / 1000);
                drawParticle(particle);
                drawConnections(particle, index);
            });

            // Animation
            requestAnimationFrame(update);
        }
    };

    // Handlers
    const onMouseMoveHandler = (e) => {
        interactionParticle.x = e.clientX + 10 * (e.clientX / canvas.width); // scales with scrollbar width (i dont know how to do else)
        interactionParticle.y = e.clientY;
    };

    // let windowDimensions = useWindowSize();
    const [size, setSize] = useState({width: 0, height: 0});
    useEffect(() => {
        function updateSize() {
            setSize({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Setuping the canvas and the animation
    useEffect(() => {
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");

        // Creating the particles
        if (!initialized) {
            createParticles();
            initialized = true;
        }

        requestAnimationFrame(update);
      

        // Adding listeners
        window.addEventListener("mousemove", onMouseMoveHandler);

        return () => window.removeEventListener("mousemove", onMouseMoveHandler);
    }, [size, props.enableParticles]);

    return (
        <StyledCanvas
            width={size.width}
            height={size.height}
            ref={canvasRef}
            {...props}
        />
    );
};

export default ParticlesNetwork;
