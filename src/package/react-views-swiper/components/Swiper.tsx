import React, { Children, ReactNode, CSSProperties, useEffect, useState } from "react";
import { useSyncWithIndex } from "../core/useSyncWithIndex";
import View from "./View";

interface SwiperProps {
    children: ReactNode | React.ReactNode[];
    containerStyle?: CSSProperties
    index?: number;
    onChangeIndex?: (index: number) => void | undefined;
    onChangeView?: (viewIndex: number) => void | undefined;
    renderOnlyActive?: boolean;
    resistance?: boolean;
}

const root: CSSProperties = {
    overflow: "hidden",
    display: 'flex',
    position: 'relative',
/*     height: '100%',
 */    width: '100%',

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

export const Swiper = ({
    children, 
    containerStyle, 
    index, 
    onChangeIndex, 
    onChangeView, 
    renderOnlyActive, 
    resistance = false
}: SwiperProps) => {
    
    const childrenList = Children.toArray(children);
    const viewCount = childrenList.length;
    const maxIndex = viewCount - 1;
    const [ currentIndex, setCurrentIndex ] = useSyncWithIndex(index!, maxIndex);
    const [ translation, setTranslation ] = useState(0);
    
    useEffect(() => {
        if(index && onChangeIndex) onChangeIndex(index);
    }, [index]);

    useEffect(() => {
        if(onChangeView)  onChangeView(currentIndex);
    }, [currentIndex]);


    return (
        <div style={{...styles.root, ...containerStyle}}>
            { currentIndex !== undefined &&
                <div id="slide-container" style={styles.imageContainer}>
                    {Children.map(childrenList, (child, indexChild) => {
                        if(renderOnlyActive && currentIndex !== indexChild) return null;
                        const hidden = currentIndex !== indexChild;
    
                        return(
                            <View   
                                currentIndex={currentIndex} 
                                hidden={hidden} 
                                onChangeIndex={setCurrentIndex}
                                resistance={resistance}
                                setTranslation={setTranslation}
                                translation={translation}
                                viewCount={childrenList.length}
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