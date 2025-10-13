import React, { useEffect } from "react";
import { Particle } from "./page";
import { ANGLE_DELTA, SIZE_DELTA, SIZE_BASE, TIME_BASE } from "./page";
import { TIME_DELTA } from "./page";
import { PARTICLES } from "./page";

export const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toPolarCoordinates = (angle: number, distance: number) => {
    const angleRad = (angle * Math.PI) / 180;
    const x = distance * Math.cos(angleRad);
    const y = distance * Math.sin(angleRad);
    return { x: x + 'px', y: y + 'px' };
};



export const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 50;
    const lightness = Math.floor(Math.random() * 20) + 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};


export const getRandomSize = (baseSize: number) => {
    return Math.ceil(baseSize + SIZE_DELTA * Math.random()) + 'px';
};

export const getRandomTime = (baseTime: number, chaos: number) => {
    const chaosResponsiveTime = Math.max(
        baseTime,
        baseTime * (chaos / PARTICLES)
    );
    return (chaosResponsiveTime + TIME_DELTA * Math.random()).toFixed(2) + 's';
};


export const generateParticles = (numberOfParticles: number, chaos: number, parentHeight: number) => {

    const particles = [];
    const minParticles = Math.max(20, chaos);

    for (let i = 0; i < minParticles; i++) {

        const randomAngle =
            (360 / minParticles) * i + random(-ANGLE_DELTA, ANGLE_DELTA);

        const randomDistance = random(parentHeight * 0.7, parentHeight * 0.8);
        const { x, y } = toPolarCoordinates(randomAngle, randomDistance);

        const randomSize = getRandomSize(SIZE_BASE);
        const randomTime = getRandomTime(TIME_BASE, chaos);
        const randomColor = getRandomPastelColor();

        particles.push({
            x,
            y,
            duration: randomTime,
            size: randomSize,
            color: randomColor,
        });
    }


    return particles;
}


export const useCleanUp = (setParticles: (particles: Particle[]) => void, isLiked: boolean, maxDuration: number) => {
    useEffect(() => {
        const cleanUp = setTimeout(() => {
            setParticles([]);
        }, maxDuration);

        return () => clearTimeout(cleanUp);

    }, [isLiked])
}