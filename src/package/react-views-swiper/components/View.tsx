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


interface ViewProps {
    children?: ReactNode| ReactNode[];
    currentIndex?: number,
    hidden?: boolean,
    index?: number,
    onChangeIndex?: (index: number) => void;
    resistance?: boolean,
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
        transition: 'left 0.5s ease-out',
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
    hidden = false, 
    onChangeIndex, 
    resistance = false,
    setTranslation, 
    translation = 0, 
    viewCount = 0, 
}: ViewProps) => {
    const viewRef = createRef<HTMLDivElement>();
    const [viewWidth, setViewWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition ] = useState(0);

    const handleTouchStart = (event: MouseEvent | TouchEvent) => {
        setIsDragging(true);

        setStartPosition(getPositionX(event));
        if(viewRef.current) viewRef.current?.classList.add('grabbing');   
    };

    const handleTouchMove = (event: MouseEvent | TouchEvent) => {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const currentTranslate = currentPosition - startPosition;
            setTranslation?.(currentTranslate);
        }
    };

    const handleTouchEnd = () => {

        if(isDragging){
            setIsDragging(false);

            if(translation < -viewWidth/2){
                if(currentIndex !== viewCount -1) {
                    onChangeIndex?.( currentIndex + 1);
                    setTranslation?.(0);
                    return;
                }
            }
    
            if(translation > viewWidth/2){
                if(currentIndex !== 0) {

                    onChangeIndex?.( currentIndex - 1);
                    setTranslation?.(0);
                    return;
                }
            }

            setTranslation?.(0);
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
        if(viewRef.current) viewRef.current.style.left = `-${viewWidth*currentIndex}px`;
    }, [currentIndex, viewRef]);

    useLayoutEffect(() => {

        if(viewRef.current) {
            if( resistance && isBoundary(currentIndex, translation, viewCount -1 )) return
            viewRef.current.style.transform = `translateX(${translation}px)`;
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
