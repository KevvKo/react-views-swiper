import { CSSProperties } from "react";

export const styles = {
    root: {
        position: 'relative',
        left: 0,
        height: '100%',
        width: '100%',
        flexShrink: 0,
    } as CSSProperties,
   childrenContainer: {
        pointerEvents: 'none'
    } as CSSProperties
};