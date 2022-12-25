import React, { useState, CSSProperties } from "react";
import { Swiper } from "../package/react-views-swiper";

const App = () => {

    const [index, setIndex] = useState(0);

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

    const styles = {
        view1,
        view2,
        view3
    };

    return(
        <main>
            <section>
                <h2>Basic Usage</h2>
                <Swiper index={index}>
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
                <Swiper renderOnlyActive>
                    <div style={styles.view1}>View 1</div>
                    <div style={styles.view2}>View 2</div>
                    <div style={styles.view3}>View 3</div>
                </Swiper>
            </section>
            <section>
                <h2>Buttons to change the view</h2>
                <Swiper renderOnlyActive>
                    <div style={styles.view1}>View 1</div>
                    <div style={styles.view2}>View 2</div>
                    <div style={styles.view3}>View 3</div>
                </Swiper>
            </section>
        </main>
    );
};

export default App;