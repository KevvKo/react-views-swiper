import { CSSProperties } from "react";

export const styles = (enablePointerEvents: boolean) => {
    const root = {
        position: 'relative',
        left: 0,    
        height: '100%',
        width: '100%',
        flexShrink: 0,
    } as CSSProperties;

    const childrenContainer = {
        pointerEvents: enablePointerEvents ? 'auto' : 'none',
        height: '100%',
    } as CSSProperties;

    return {
        root,
        childrenContainer
    };
};