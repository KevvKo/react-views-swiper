import React, { ReactNode, useEffect ,useState, CSSProperties, createRef, MouseEvent, TouchEvent } from 'react';
import './View.css'

interface ViewProps {
    children: ReactNode| ReactNode[];
    currentIndex: number,
    onChangeIndex: (index: number) => void | undefined;
    hidden: boolean,
    index?: number,
    viewCount: number
}

const root: CSSProperties = {
    transition: 'left 0.5s',
    background: 'aquamarine',
    position: 'relative',
    left: 0,
    height: '100%',
    width: '100%',
    flexShrink: 0
}

const styles = {
    root,
}

const View = ({children, hidden, index, viewCount, currentIndex, onChangeIndex}: ViewProps) => {
    
    const viewRef = createRef<HTMLDivElement>()
    let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID: any
    const [viewWidth, setViewWidth] = useState(0);
    const getPositionX = (event: any) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }
    
    function animation() {
        setSliderPosition()
        if (isDragging) requestAnimationFrame(animation)
      }
    
      function setPositionByIndex() {
        currentTranslate = currentIndex * -viewWidth
        prevTranslate = currentTranslate
        setSliderPosition()
      }
    
    
    function setSliderPosition() {
        if(viewRef.current) viewRef.current!.style.transform = `translateX(${currentTranslate}px)`
      }
  
      
    const handleTouchStart = (event: MouseEvent | TouchEvent, index: number) => {

            currentIndex = index
            startPos = getPositionX(event)
            isDragging = true
            animationID = requestAnimationFrame(animation)
            if(viewRef.current) viewRef.current?.classList.add('grabbing')         
    }

    const handleTouchEnd = () => {
        cancelAnimationFrame(animationID)
        isDragging = false
        const movedBy = currentTranslate - prevTranslate

        if (movedBy < -viewWidth/2 ) {
            const newIndex = currentIndex +1

            if( newIndex > viewCount - 1) {
                onChangeIndex(0)
                console.log(newIndex)
            }
            else onChangeIndex(newIndex)
        } 

        if (movedBy > viewWidth/2 ) {
            const newIndex = currentIndex -1

            if( newIndex < 0 ) {
                onChangeIndex(viewCount - 1)
            }
            else onChangeIndex(newIndex)
        }

        setPositionByIndex()

        if(viewRef.current) viewRef.current?.classList.remove('grabbing')
    }
    
    const handleTouchMove = (event: MouseEvent | TouchEvent) => {
        if (isDragging) {
            const currentPosition = getPositionX(event)
            currentTranslate = prevTranslate + currentPosition - startPos
          }
    }

    useEffect(() => {
        if(viewRef && viewWidth === 0) {
            if(viewRef.current) setViewWidth(
                viewRef.current!.getBoundingClientRect().width
            )
        }
    }, [viewRef]);

    useEffect(() => {
        setPositionByIndex()
    }, [currentIndex]);

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
