import { useEffect, useRef } from 'react'

const useAnimationFrame = (animationCallback: any) => {

        const frame = useRef(0);

        const animate = () => {
            animationCallback();

            frame.current = requestAnimationFrame(animate)
        }

        useEffect(() => {
            frame.current = requestAnimationFrame(animate)

            return () => cancelAnimationFrame(frame.current)
    }, [])

    return [ frame]
}

export default useAnimationFrame;