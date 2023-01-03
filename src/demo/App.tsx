import React, { useState, CSSProperties } from "react";
import { Swiper } from "../package/react-views-swiper";

const App = () => {

    const [index, setIndex] = useState(1);

    const view1: CSSProperties = {
            backgroundColor: '#FFA301',
            height: '10rem'
    };
    const view2: CSSProperties = {
        backgroundColor: '#30DAA1',
        height: '10rem'
    };    
    const view3: CSSProperties = {
        backgroundColor: '#D82EDE',
        height: '10rem'
    };

    const containerStyle: CSSProperties = {
        display: "flex",
        alignItems: 'center'
    }

    const styles = {
        view1,
        view2,
        view3,
        containerStyle
    };

    const handleClickBack = () => {
        if(index === 0) {
            setIndex(2)
            return
        }

        setIndex( prev => prev + 1)
    }

    const handleClickNext= () => {
        if(index === 2) {
            setIndex(0)
            return
        }

        setIndex( prev => prev + 1)
    }

    return(
        <main>
            {/* <section>
                <h2>Basic Usage</h2>
                <Swiper>
                    <div style={styles.view1}>View 1</div>
                    <div style={styles.view2}>View 2</div>
                    <div style={styles.view3}>View 3</div>
                </Swiper>
            </section>
            <section>
                <h2>Only Active View is rendered</h2>
                <Swiper renderOnlyActive>
                    <div style={styles.view1}>View 1</div>
                    <div style={styles.view2}>View 2</div>
                    <div style={styles.view3}>View 3</div>
                </Swiper>
            </section>
            <section>
                <h2>Custom container style</h2>
                <Swiper>
                    <div style={styles.view1}>View 1</div>
                    <div style={styles.view2}>View 2</div>
                    <div style={styles.view3}>View 3</div>
                </Swiper>
            </section>
            <section>
                <h2>Resistance</h2>
                <Swiper resistance>
                    <div  style={styles.view1}>View 1</div>
                    <div style={styles.view2}>View 2</div>
                    <div style={styles.view3}>View 3</div>
                </Swiper>
            </section> */}
            <section>
                <h2>Buttons to change the view</h2>
                <div style={styles.containerStyle}>
                    <button onClick={handleClickBack}>Back</button>
                    <Swiper index={index} onChangeView={() => console.log("voe")}>
                        <div style={styles.view1}>View 1</div>
                        <div style={styles.view2}>View 2</div>
                        <div style={styles.view3}>View 3</div>
                    </Swiper>
                    <button onClick={handleClickNext}>Next</button>
                </div>
            </section>
        </main>
    );
};

export default App;