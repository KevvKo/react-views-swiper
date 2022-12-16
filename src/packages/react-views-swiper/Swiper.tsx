import React, { Children, ReactNode, CSSProperties, useEffect, useState } from "react";
import View from "./View";

interface SwiperProps {
    children: ReactNode | React.ReactNode[];
    index?: number | 0;
    onIndexChanged?: (index: number) => void | undefined;
    renderOnlyActive?: boolean;
    containerStyle?: CSSProperties
}

const root: CSSProperties = {
    overflow: "hidden",
    display: 'flex',
    position: 'relative',
    height: '100%',
    width: '100%'
}

const imageContainer: CSSProperties = {
    overflow: "hidden",
    display: 'flex',
    position: 'relative',
    height: '100%',
    width: '100%'
}

const styles = {
    root,
    imageContainer,
}

const Swiper = ({children, index, onIndexChanged, renderOnlyActive = false, containerStyle}: SwiperProps) => {
    const childrenList = Children.toArray(children)
    const [currentIndex, setCurrentIndex] = useState(index)

    useEffect(() => {
        if(index !== currentIndex) setCurrentIndex(index)
        const views = document.querySelectorAll<HTMLElement>('.slide-view');

        // if(views) {
        //     views.forEach(view =>{
        //         const viewWidth = view.getBoundingClientRect().width;
        //         if(currentIndex === 0) view.style.left = `-${ viewWidth * 1}px`
        //         else if(currentIndex === childrenList.length -1) view.style.left = `-${ viewWidth * 0}px`
        //         else view.style.left = `-${ viewWidth * (currentIndex! +1)}px`
        //     })
        // }
    }, [index, currentIndex])

    return (
        <div style={{...styles.root, ...containerStyle}}>
            <div id="slide-container" style={styles.imageContainer}>
            {Children.map(childrenList, (child, indexChild) => {
                if(renderOnlyActive && currentIndex !== indexChild) return null;
                let hidden = currentIndex === indexChild;

                return(
                    <View   
                        index={indexChild} 
                        hidden={hidden} 
                        currentIndex={currentIndex!} 
                        viewCount={childrenList.length}
                    >{child}</View>
                )
                })}
            </div>
        </div>
    )
}

export default Swiper;