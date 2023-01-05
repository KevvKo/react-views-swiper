import { render } from '@testing-library/react';
import React, { 
    useLayoutEffect, 
    ReactNode, 
    useEffect,
    useState, 
    CSSProperties, 
    createRef, 
    MouseEvent,
    TouchEvent
} from 'react';
import { getPositionX } from '../core/getPositionX';
import { isBoundary } from '../core/isBoundary';

/**
@todo implement transition listener to remove left transition
@todo transition for left animation is not default, will just be added if transition is subscribed

*/

interface ViewProps {
    children?: ReactNode| ReactNode[];
    currentIndex?: number,
    hidden?: boolean,
    isDragging?: boolean,
    index?: number,
    onChangeIndex?: (index: number) => void;
    renderOnlyActive?: boolean,
    resistance?: boolean,
    setIsDragging?: (value: boolean) => void;
    setTranslation?: (index: number) => void;
    translation?: number,
    viewCount?: number,
}

const styles = (isHovering: boolean) => {

    const root: CSSProperties = {
        position: 'relative',
        left: 0,
        height: '100%',
        width: '100%',
        flexShrink: 0,
        // transition: 'left 0.5s ease-out',
        cursor: isHovering ? 'grabbing' : 'grab'
    };

    const childrenContainer: CSSProperties = {
        pointerEvents: 'none'
    }
    return {
        root,
        childrenContainer
    };
};

const View = ({
    children, 
    currentIndex = 0, 
    isDragging = false,
    hidden = false, 
    onChangeIndex, 
    renderOnlyActive = false,
    resistance = false,
    setIsDragging,
    setTranslation, 
    translation = 0, 
    viewCount = 0, 
}: ViewProps) => {
    const viewRef = createRef<HTMLDivElement>();
    const [viewWidth, setViewWidth] = useState(0);
    const [startPosition, setStartPosition ] = useState(0);

    const handleTouchStart = (event: MouseEvent | TouchEvent) => {
        setIsDragging?.(true);

        setStartPosition(getPositionX(event));
        if(viewRef.current) viewRef.current?.classList.add('grabbing');   
    };

    const handleTouchMove = (event: MouseEvent | TouchEvent) => {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const currentTranslate = ((currentPosition - startPosition)/viewWidth)*100;
            setTranslation?.(currentTranslate);
        }
    };

    const handleTouchEnd = () => {

        if(isDragging){
            setIsDragging?.(false);
            const viewWidthHalf = ((viewWidth * 0.5)/viewWidth)*100

            if(renderOnlyActive) setTranslation?.(0)
            if(translation < -viewWidthHalf){
                if(currentIndex !== viewCount -1) {
                    onChangeIndex?.( currentIndex + 1);
                    if(!renderOnlyActive) setTranslation?.((currentIndex+1) *-100);
                    return;
                }
            }
            if(translation > viewWidthHalf){
                if(currentIndex !== 0) {

                    onChangeIndex?.( currentIndex - 1);
                    if(!renderOnlyActive) setTranslation?.((currentIndex+1) *-100);
                    return;
                }
            }
        }

        if(viewRef.current) viewRef.current?.classList.remove('grabbing');

    };

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
            if( resistance && isBoundary(currentIndex, translation, viewCount -1 )) return
            if (isDragging) {

                let newTranslation;
                if(renderOnlyActive) newTranslation = translation;
                else newTranslation = (currentIndex*-100) + translation

                viewRef.current.style.transform = `translateX(${newTranslation}%)`;
            }
            if(!isDragging && renderOnlyActive) {
                viewRef.current.style.transform = `translateX(${0}%)`;
            }
        }
    }, [translation]);

    return (
        <div 
            className='slide-view' 
            ref={viewRef} 
            style={styles(isDragging).root} 
            aria-hidden={hidden}
            onTouchStart={(event) => handleTouchStart(event)}
            onTouchEnd={handleTouchEnd}
            onTouchMove={(event) => handleTouchMove(event)}
            onMouseDown={(event) => handleTouchStart(event)}
            onMouseUp={handleTouchEnd}
            onMouseMove={(event) => handleTouchMove(event)}
            onMouseLeave={handleTouchEnd}
        >
            <span style={styles(isDragging).childrenContainer} >
                {children}
            </span>
        </div>
    );
};

export default View;
