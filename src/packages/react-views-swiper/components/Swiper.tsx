import React, { Children, ReactNode, CSSProperties, useEffect, useState } from "react";
import { useSyncWithIndex } from "../../react-views-swiper-core";
import View from "./View";

interface SwiperProps {
    children: ReactNode | React.ReactNode[];
    index?: number;
    onIndexChanged?: (index: number) => void | undefined;
    renderOnlyActive?: boolean;
    containerStyle?: CSSProperties
}

const root: CSSProperties = {
    overflow: "hidden",
    display: 'flex',
    position: 'relative',
    height: '100%',
    width: '100%',

};

const imageContainer: CSSProperties = {
    overflow: "hidden",
    display: 'flex',
    position: 'relative',
    height: '100%',
    width: '100%'
};

const styles = {
    root,
    imageContainer,
};

const Swiper = ({children, index, onIndexChanged, renderOnlyActive, containerStyle}: SwiperProps) => {
    
    const childrenList = Children.toArray(children);
    const viewCount = childrenList.length;
    const maxIndex = viewCount - 1;
    const [ currentIndex, setCurrentIndex ] = useSyncWithIndex(index!, maxIndex);
    const [ translation, setTranslation ] = useState(0);
    
    useEffect(() => {
        if( index && onIndexChanged) onIndexChanged(index);
    }, [index]);

    return (
        <div style={{...styles.root, ...containerStyle}}>
            { currentIndex !== undefined &&
                <div id="slide-container" style={styles.imageContainer}>
                    {Children.map(childrenList, (child, indexChild) => {
                        if(renderOnlyActive && currentIndex !== indexChild) return null;
                        const hidden = currentIndex !== indexChild;
    
                        return(
                            <View   
                                hidden={hidden} 
                                currentIndex={currentIndex} 
                                viewCount={childrenList.length}
                                onChangeIndex={setCurrentIndex}
                                translation={translation}
                                setTranslation={setTranslation}
                            >{child}</View>
                        );
                    })}
                </div>
            }
        </div>
    );
};

Swiper.defaultProps = {
    index: 0,
    renderOnlyActive: false
};

export default Swiper;