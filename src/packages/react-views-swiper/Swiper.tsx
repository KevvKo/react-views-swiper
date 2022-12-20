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
    const [translation, setTranslation ] = useState(0);

    useEffect(() => {
        setCurrentIndex(index)
    }, [index])

    const handleIndexChange = (index: number) => {

    }

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
                        onChangeIndex={setCurrentIndex}
                        translation={translation}
                        setTranslation={setTranslation}
                    >{child}</View>
                )
                })}
            </div>
        </div>
    )
}

export default Swiper;