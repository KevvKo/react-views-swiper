import React, { useLayoutEffect, ReactNode, useRef, useEffect ,useState, CSSProperties, createRef, MouseEvent, TouchEvent } from 'react';
import './View.css'

interface ViewProps {
    children: ReactNode| ReactNode[];
    currentIndex: number,
    onChangeIndex: (index: number) => void | undefined;
    hidden: boolean,
    index?: number,
    viewCount: number,
    translation: number,
    setTranslation: (index: number) => void | undefined;
}

const root: CSSProperties = {
    background: 'aquamarine',
    position: 'relative',
    left: 0,
    height: '100%',
    width: '100%',
    flexShrink: 0,
    transition: 'left 0.5s ease-out',
}

const styles = {
    root,
}

const View = ({children, hidden, index, viewCount, currentIndex, onChangeIndex, setTranslation, translation }: ViewProps) => {
    
    const viewRef = createRef<HTMLDivElement>()
    const [viewWidth, setViewWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false)
    const [startPosition, setStartPosition ] = useState(0)

    const getPositionX = (event: any) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }
    
    const handleTouchStart = (event: MouseEvent | TouchEvent, index: number) => {
        setIsDragging(true)

        setStartPosition(getPositionX(event))
        if(viewRef.current) viewRef.current?.classList.add('grabbing')         
    }
        
    const handleTouchMove = (event: MouseEvent | TouchEvent) => {
        if (isDragging) {
            const currentPosition = getPositionX(event)
            const currentTranslate = currentPosition - startPosition
            setTranslation(currentTranslate)
        }
    }

    const handleTouchEnd = (event: MouseEvent | TouchEvent) => {

        if(isDragging){
            setIsDragging(false)

            if(translation < -viewWidth/2){
                if(currentIndex !== viewCount -1) {
                    onChangeIndex( currentIndex + 1)
                    setTranslation(0)
                    return
                }
            }
    
            if(translation > viewWidth/2){
                if(currentIndex !== 0) {
                    onChangeIndex( currentIndex - 1)
                    setTranslation(0)
                    return
                }
            }

            setTranslation(0)

        }

        if(viewRef.current) viewRef.current?.classList.remove('grabbing')

    }

    useEffect(() => {
        if(viewRef && viewWidth === 0) {
            if(viewRef.current) {
                setViewWidth( viewRef.current!.getBoundingClientRect().width)
            }
        }
    }, [viewWidth, viewRef])

    useLayoutEffect(() => {
        if(viewRef.current) viewRef.current!.style.left = `-${viewWidth*currentIndex}px`
    }, [currentIndex])

    useLayoutEffect(() => {
            viewRef.current!.style.transform = `translateX(${translation}px)`
    }, [translation])

    return (
        <>
            <div 
                className='slide-view' 
                ref={viewRef} 
                style={styles.root} 
                aria-hidden={hidden}
                onTouchStart={(event) => handleTouchStart(event, index!)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={(event) => handleTouchMove(event)}
                onMouseDown={(event) => handleTouchStart(event, index!)}
                onMouseUp={handleTouchEnd}
                onMouseMove={(event) => handleTouchMove(event)}
                onMouseLeave={handleTouchEnd}
            >
                {children}
            </div>
        </>
    )
}

export default View;
