import React, { ReactNode, createRef } from 'react';
import { styles } from './View.style';
/**
@todo implement transition listener to remove left transition
@todo transition for left animation is not default, will just be added if transition is subscribed

*/

interface ViewProps {
    children?: ReactNode| ReactNode[];
    hidden?: boolean,
}

const View = ({
    children, 
    hidden = false,  
}: ViewProps) => {
    const viewRef = createRef<HTMLDivElement>();

    return (
        <div 
            className='slide-view' 
            ref={viewRef} 
            style={styles.root} 
            aria-hidden={hidden}
        >
            <span style={styles.childrenContainer} >
                {children}
            </span>
        </div>
    );
};

export default View;
