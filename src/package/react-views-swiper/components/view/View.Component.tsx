import React, { ReactNode, createRef } from 'react';
import { styles } from './View.style';
/**
@todo implement transition listener to remove left transition
@todo transition for left animation is not default, will just be added if transition is subscribed

*/

interface ViewProps {
    children?: ReactNode| ReactNode[];
    enablePointerEvents: boolean
    hidden?: boolean,
}

const View = ({
    children, 
    enablePointerEvents,
    hidden = false,  
}: ViewProps) => {
    const viewRef = createRef<HTMLDivElement>();

    return (
        <div 
            className='slide-view' 
            ref={viewRef} 
            style={styles(enablePointerEvents).root} 
            aria-hidden={hidden}
        >
            <div style={styles(enablePointerEvents).childrenContainer} >
                {children}
            </div>
        </div>
    );
};

export default View;
