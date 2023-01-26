import { CSSProperties } from "react";
import { getCursorClass } from "../../core/getGrabbingClass";

export const styles = (isHovering: boolean, touchEventsEnabled: boolean) => {

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
        cursor: getCursorClass(isHovering, touchEventsEnabled)
    };

    return {
        root,
        imageContainer,
    };
};