import React, { ReactNode, useEffect , CSSProperties, createRef, MouseEvent, TouchEvent } from 'react';
import './View.css'

interface ViewProps {
    children: ReactNode| ReactNode[];
    hidden: boolean,
    index?: number
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
  animationID,
  currentIndex = 0

const View = ({children, hidden, index}: ViewProps) => {
    
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
        viewRef.style.transform = `translateX(${currentTranslate}px)`
      }
  
      
    const handleTouchStart = (event: any, index: number) => {
        return function (event :any) {
            currentIndex = index
            startPos = getPositionX(event)
            isDragging = true
            animationID = requestAnimationFrame(animation)
            // viewRef.classList.add('grabbing')
          }
    }

    const handleTouchEnd = () => {}
    const handleTouchMove = () => {
        console.log("jo")
    }

    useEffect(() => {

        viewRef.current?.addEventListener('touchstart', (event) => handleTouchStart(event, index))
        viewRef.current?.addEventListener('touchend', handleTouchEnd)
        viewRef.current?.addEventListener('touchmove', handleTouchMove)

        viewRef.current?.addEventListener('mousedown', handleTouchStart)
        viewRef.current?.addEventListener('mouseup', handleTouchEnd)
        viewRef.current?.addEventListener('mousemove', handleTouchMove)
        viewRef.current?.addEventListener('mouseleave', handleTouchEnd)
    }, [])
    return (
        <>
            <div className='slide-view' ref={viewRef} onTouchStart={handleTouchStart} style={styles.root} aria-hidden={hidden}>
                {children}
            </div>
        </>
    )
}

export default View;
