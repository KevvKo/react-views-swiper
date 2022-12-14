import React from 'react';

interface SlideTargetProps {
    targets: number;
}
const SlideTargets = ({targets}: SlideTargetProps) => {

    const targetSlides = [];
    for (let i = 0; i < targets; i++) {
        targetSlides.push(<span id={`slide-view-${targets}`}></span>)
    }

    return (
        <>
         {targetSlides}
        </>
    )
}

export default SlideTargets;