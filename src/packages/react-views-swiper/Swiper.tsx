import React, { Children, ReactNode } from "react";
import View from "./View";

interface SwiperProps {
    children: ReactNode | React.ReactNode[];
    index?: number | undefined;
    onIndexChanged?: (index: number) => void | undefined;
}


const Swiper = ({children, index, onIndexChanged}: SwiperProps) => {

    const childrenList = Children.toArray(children)
    
    return (
        <div>
            {Children.map(childrenList, (child, indexChild) => {

                if(index !== indexChild) return null;
                let hidden = index === indexChild;

                return(
                    <View hidden={hidden}>{child}</View>
                )
            })}
        </div>
    )
}

export default Swiper;