import { CSSProperties } from "react";

export const styles = (isHovering: boolean) => {

    const root: CSSProperties = {
        overflow: "hidden",
        display: 'flex',
        position: 'relative',
        width: '100%',
    };
    
    const imageContainer: CSSProperties = {
        display: 'flex',
        position: 'relative',
        height: '100%',
        width: '100%',
        cursor: isHovering ? 'grabbing' : 'grab'
    };

    return {
        root,
        imageContainer,
    };
};