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
    const viewCount = childrenList.length
    const maxIndex = viewCount - 1;
    const [currentIndex, setCurrentIndex] = useState(index)
    const [previousIndex, setPreviousIndex] = useState(index)
    const [translation, setTranslation ] = useState(0);

    useEffect(() => {

        const directionDistance = index! - previousIndex!

        // sync with negative direction
        if ( directionDistance === -1 || directionDistance === maxIndex ){

            if(currentIndex === 0) setCurrentIndex(maxIndex)
            else setCurrentIndex( prev => prev! - 1 )
        }

        // sync with positive direction
        else if ( directionDistance === 1 || directionDistance === maxIndex *(-1)){
            if ( currentIndex === maxIndex) setCurrentIndex(0);
            else setCurrentIndex( prev => prev! +1)
        }
        setPreviousIndex(index)
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