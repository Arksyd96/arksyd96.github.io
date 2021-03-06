import { useEffect, useRef } from "react";
import styled from "@emotion/styled"

const skills = require("../../static-data/skills.json");

const counts = [1, 3, 5, 7, 5, 3, 1];
const options = {
    tilt: Math.PI / 9,
    initialVelocityX: 0.09,
    initialVelocityY: 0.09,
    initialRotationX: Math.PI * 0.14,
    initialRotationZ: 0,
};

const SphereCanvas = styled.canvas`
    width: 500px;
    height: 500px;
    @media (max-width: 768px) {
        width: 350px;
        height: 350px;
    }
`;

const KeywordsSphere = props => {
    // Variables related to the canvas

    const canvasRef = useRef(null);
    let canvas = null;
    let ctx = null;
    // --------
    const π = Math.PI; // happy math!
    const {
        radius = props.isMobile ? 100 : 150,
        fontSize = props.isMobile ? 16 : 19,
        tilt = 0,
        initialVelocityX = 0,
        initialVelocityY = 0,
        initialRotationX = 0,
        initialRotationZ = 0,
    } = options;

    let vx = initialVelocityX,
        vy = initialVelocityY;
    let rx = initialRotationX,
        rz = initialRotationZ;

    let clicked = false,
        lastX,
        lastY;

    const rot = (x, y, t) => {
        return [
            x * Math.cos(t) - y * Math.sin(t),
            x * Math.sin(t) + y * Math.cos(t),
        ];
    };

    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let ix = 0,
            iz = 0;
        for (const kw of skills) {
            const degZ = (π / (counts.length )) * iz;
            const degX = ((2 * π) / counts[iz]) * ix;

            let x = radius * Math.sin(degZ) * Math.cos(degX);
            let y = radius * Math.sin(degZ) * Math.sin(degX);
            let z = radius * Math.cos(degZ) + 8 * (ix % 2); /* randomness */

            // camera transform
            [y, z] = rot(y, z, tilt);
            [x, z] = rot(x, z, rz);
            [x, y] = rot(x, y, rx);

            // convert to cartesian and then draw.
            const alpha = 0.6 + 0.4 * (x / radius);
            const size = fontSize + 5 * (x / radius);
            ctx.fillStyle = `rgba(189, 148, 100, ${alpha})`;
            ctx.font = `${size}px "Roboto mono", monospace`;
            ctx.fillText(kw, y + 500 / 2 - 20, -z + 500 / 2);

            ix--;
            if (ix < 0) {
                iz++;
                ix = counts[iz] - 1;
            }
        }
    };

    let looping = false;
    const rendererLoop = () => {
        if (looping) window.requestAnimationFrame(rendererLoop);
        render();

        // deacceleration - dirty code xD
        if (vx > 0) vx = vx - 0.01;
        if (vy > 0) vy = vy - 0.01;
        if (vx < 0) vx = vx + 0.01;
        if (vy > 0) vy = vy + 0.01;
        if (vx === 0 && vy === 0) stopLoop();

        rz += vy * 0.01;
        rx += vx * 0.01;
    };

    function startLoop() {
        looping = true;
        window.requestAnimationFrame(rendererLoop);
    }

    function stopLoop() {
        looping = false;
    }

    // Setuping the canvas and the animation
    useEffect(() => {
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        ctx.textAlign = "center";
        // Hi-DPI support
        canvas.width = 1000;
        canvas.height = 1000;
        /* canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`; */
        ctx.scale(2, 2);

        startLoop();

        // Adding listeners
        canvas.addEventListener("mousedown", (event) => {
            clicked = true;
            lastX = event.screenX;
            lastY = event.screenY;
        });
        canvas.addEventListener("mousemove", (event) => {
            if (!clicked) return;
            let [dx, dy] = [event.screenX - lastX, event.screenY - lastY];
            [lastX, lastY] = [event.screenX, event.screenY];

            // rotation update
            rz += -dy * 0.01;
            rx += dx * 0.01;

            // velocity update
            vx = dx * 0.1;
            vy = dy * 0.1;

            if (!looping) startLoop();
        });
        canvas.addEventListener("mouseup", (e) => (clicked = false));
        canvas.addEventListener("mouseleave", (e) => (clicked = false));

    }, []);

    return (
        <SphereCanvas ref={canvasRef}/>
    );
};

export default KeywordsSphere;
