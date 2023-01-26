import React, { 
    useLayoutEffect,     
    MouseEvent,
    TouchEvent,
    createRef, 
    Children, 
    ReactNode, 
    CSSProperties, 
    useEffect, 
    useState 
} from "react";
import { useSyncWithIndex } from "../../core/useSyncWithIndex";
import { getPositionX } from '../../core/getPositionX';
import { isBoundary } from '../../core/isBoundary';
import View from "../view/View.Component";
import { styles } from "./Swiper.style";

interface SwiperProps {
    children: ReactNode | React.ReactNode[];
    containerStyle?: CSSProperties,
    enablePointerEvents?: boolean;
    enableTouchEvents?: boolean;
    index?: number;
    onChangeIndex?: (index: number) => void | undefined;
    onChangeView?: (viewIndex: number) => void | undefined;
    renderOnlyActive?: boolean;
    resistance?: boolean;
}

export const Swiper = ({
    children, 
    containerStyle, 
    enablePointerEvents=false,
    enableTouchEvents=true,
    index, 
    onChangeIndex, 
    onChangeView, 
    renderOnlyActive, 
    resistance = false
}: SwiperProps) => {

    const viewRef = createRef<HTMLDivElement>();
    const childrenList = Children.toArray(children);
    const viewCount = childrenList.length;
    const maxIndex = viewCount - 1;
    const [ currentIndex, setCurrentIndex ] = useSyncWithIndex(index!, maxIndex);
    const [ translation, setTranslation ] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [viewWidth, setViewWidth] = useState(0);
    const [startPosition, setStartPosition ] = useState(0);
    
    const handleTouchStart = (event: MouseEvent | TouchEvent) => {
        if(enableTouchEvents) {
            setIsDragging?.(true);

            setStartPosition(getPositionX(event));
            if(viewRef.current) viewRef.current?.classList.add('grabbing');  
        } 
    };

    const handleTouchMove = (event: MouseEvent | TouchEvent) => {
        if (isDragging && enableTouchEvents) {
            const currentPosition = getPositionX(event);
            const currentTranslate = ((currentPosition - startPosition)/viewWidth)*100;
            setTranslation?.(currentTranslate);
        }
    };

    const handleTouchEnd = () => {

        if(enableTouchEvents){
            if(isDragging){
                setIsDragging?.(false);
                const viewWidthHalf = ((viewWidth * 0.5)/viewWidth)*100;
    
                if(renderOnlyActive) setTranslation?.(0);
                if(translation < -viewWidthHalf){
                    if(currentIndex !== viewCount -1) {
                        setCurrentIndex?.( currentIndex + 1);
                        if(!renderOnlyActive) setTranslation?.((currentIndex+1) *-100);
                        return;
                    }
                }
                if(translation > viewWidthHalf){
                    if(currentIndex !== 0) {
    
                        setCurrentIndex?.( currentIndex - 1);
                        if(!renderOnlyActive) setTranslation?.((currentIndex+1) *-100);
                        return;
                    }
                }
            }
    
            if(viewRef.current) viewRef.current?.classList.remove('grabbing');
        }
    };
    
    useEffect(() => {
        if(index && onChangeIndex) onChangeIndex(index);
    }, [index]);

    useEffect(() => {
        if(onChangeView)  onChangeView(currentIndex);
    }, [currentIndex]);

    useEffect(() => {
        if(viewRef && viewWidth === 0) {
            if(viewRef.current) {
                setViewWidth( viewRef.current.getBoundingClientRect().width);
            }
        }
    }, [viewWidth, viewRef]);

    useLayoutEffect(() => {        
        if(viewRef.current && !isDragging && !renderOnlyActive) {
            viewRef.current.style.transform = `translateX(${currentIndex*-100}%)`;
        }
    }, [currentIndex, viewRef]);

    useLayoutEffect(() => {

        if(viewRef.current) {
            if( resistance && isBoundary(currentIndex, translation, viewCount -1 )) return;
            if (isDragging) {

                let newTranslation;
                if(renderOnlyActive) newTranslation = translation;
                else newTranslation = (currentIndex*-100) + translation;

                viewRef.current.style.transform = `translateX(${newTranslation}%)`;
            }
            if(!isDragging && renderOnlyActive) {
                viewRef.current.style.transform = `translateX(${0}%)`;
            }
        }
    }, [translation]);

    return (
        <div style={{...styles(isDragging, enableTouchEvents).root, ...containerStyle}}>
            { currentIndex !== undefined &&
                <div 
                    id="slide-container" 
                    ref={viewRef} 
                    style={styles(isDragging, enableTouchEvents ).imageContainer}
                    onTouchStart={(event) => handleTouchStart(event)}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={(event) => handleTouchMove(event)}
                    onMouseDown={(event) => handleTouchStart(event)}
                    onMouseUp={handleTouchEnd}
                    onMouseMove={(event) => handleTouchMove(event)}
                    onMouseLeave={handleTouchEnd}                
                >
                    {Children.map(childrenList, (child, indexChild) => {
                        if(renderOnlyActive && currentIndex !== indexChild) return null;
                        const hidden = currentIndex !== indexChild;
    
                        return(
                            <View   
                                enablePointerEvents={enablePointerEvents}
                                hidden={hidden} 
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