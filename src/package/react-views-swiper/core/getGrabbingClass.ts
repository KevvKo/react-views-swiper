export const getCursorClass = (isDragging: boolean, touchEventsEnabled: boolean): string => {
    if (!touchEventsEnabled) return '';

    return isDragging? 'grabbing' : 'grab';
};