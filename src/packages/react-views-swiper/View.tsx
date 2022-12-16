import React, { ReactNode, useEffect , CSSProperties, createRef, MouseEvent, TouchEvent } from 'react';
import './View.css'

interface ViewProps {
    children: ReactNode| ReactNode[];
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

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID: any,
  currentIndex = 0

const View = ({children, hidden, index, viewCount}: ViewProps) => {
    
    const viewRef = createRef<HTMLDivElement>()
    
    const getPositionX = (event: any) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }
    
    function animation() {
        setSliderPosition()
        if (isDragging) requestAnimationFrame(animation)
      }
    
      function setPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth
        prevTranslate = currentTranslate
        setSliderPosition()
      }
    
    
    function setSliderPosition() {
        viewRef.current!.style.transform = `translateX(${currentTranslate}px)`
      }
  
      
    const handleTouchStart = (event: MouseEvent | TouchEvent, index: number) => {
        
            currentIndex = index
            startPos = getPositionX(event)
            isDragging = true
            animationID = requestAnimationFrame(animation)
            viewRef.current?.classList.add('grabbing')         
    }

    const handleTouchEnd = () => {
        cancelAnimationFrame(animationID)
        isDragging = false
        const movedBy = currentTranslate - prevTranslate
        // if moved enough negative then snap to next slide if there is one
        if (movedBy < -100 && currentIndex < viewCount - 1) currentIndex += 1

        // if moved enough positive then snap to previous slide if there is one
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

        setPositionByIndex()

        viewRef.current?.classList.remove('grabbing')
    }
    
    const handleTouchMove = (event: MouseEvent | TouchEvent) => {
        if (isDragging) {
            const currentPosition = getPositionX(event)
            currentTranslate = prevTranslate + currentPosition - startPos
          }
    }

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
