import React, { useState } from 'react';
import { Swiper } from './packages/react-views-swiper'

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        height: '100px'
    },
    buttons: {
        margin: "1rem"
    }
}

const App = () => {
    const [index, setIndex] = useState(1)

    const handleChangeIndex = () => {
        console.log("change")
    }
    const handleClickNext = () => {
        if(index >= 2) {
            setIndex(0); 
            return
        }
        setIndex(index + 1)
    }

    const handleClickBack = () => {
        if(index === 0) {
            setIndex(2); 
            return
        }
        setIndex(index - 1)
    }


    return(
        <div style={styles.container}>  
            <button onClick={handleClickBack} style={styles.buttons}>back</button>
            <Swiper onIndexChanged={handleChangeIndex} index={index} >
                <div style={{backgroundColor: 'green', height: '100%'}}>1</div>
                <div style={{backgroundColor: 'blue', height: '100%'}}>2</div>
                <div style={{backgroundColor: 'red', height: '100%'}}>3</div>
            </Swiper>
            <button onClick={handleClickNext} style={styles.buttons}>next</button>
        </div>
    )
}

export default App;