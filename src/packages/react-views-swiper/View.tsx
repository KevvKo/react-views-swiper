import React, { ReactNode } from 'react';


interface ViewProps {
    children: ReactNode| ReactNode[];
    hidden: boolean
}

const View = ({children, hidden}: ViewProps) => {

    return (
        <div aria-hidden={hidden}>
            {children}
        </div>
    )
}

export default View;