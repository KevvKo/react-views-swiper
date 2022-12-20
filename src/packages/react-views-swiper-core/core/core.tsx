import { MouseEvent, TouchEvent } from "react";

export const getPositionX = (event: any) => {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

export default getPositionX;