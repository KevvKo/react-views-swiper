import React, { ReactNode, useEffect , CSSProperties} from 'react';


interface ViewProps {
    children: ReactNode| ReactNode[];
    hidden: boolean,
    index?: number
}

const root: CSSProperties = {
    transition: 'left 0.5s',
    background: 'aquamarine',
    position: 'relative',
    height: '100%',
    width: '100%',
    flexShrink: 0,
}

const styles = {
    root,
}
const View = ({children, hidden}: ViewProps) => {
    
    return (
        <>
            <div id='slide-view' style={styles.root} aria-hidden={hidden}>
                {children}
            </div>
        </>
    )
}

export default View;