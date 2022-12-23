import { useState, useEffect } from 'react';

export const useSyncWithIndex = (index: number, maxIndex: number ) => {

    const [currentIndex, setCurrentIndex] = useState(index);
    const [previousIndex, setPreviousIndex] = useState(index);

    useEffect(() => {

        if(index !== undefined && previousIndex !== undefined){

            const directionDistance = index - previousIndex;
            const moveForward = directionDistance === 1 || directionDistance === maxIndex *(-1);
            const moveBack = directionDistance === -1 || directionDistance === maxIndex;

            // sync with negative direction
            if ( moveBack ){
                if(currentIndex === 0) setCurrentIndex(maxIndex);
                else setCurrentIndex( prev => prev !== undefined ? prev -1 : prev);
            }
    
            // sync with positive direction
            else if (moveForward){
                if ( currentIndex === maxIndex) setCurrentIndex(0);
                else setCurrentIndex( prev => prev !== undefined ? prev +1 : prev );
            }
            setPreviousIndex(index);
        }
    }, [index]);

    return [currentIndex, setCurrentIndex] as const;
};

export default useSyncWithIndex;