import { isBoundary } from '../core/isBoundary';
import '@testing-library/jest-dom'


describe('isBoundary', () => {
    test( 'should returh true or false regarding to the passed parameters',() => {
        const currentIndex = 0;
        const tranlation = 0
        const maxIndex = 2;
        
        const value = isBoundary(currentIndex, tranlation, maxIndex);
        expect(value).toBeFalsy();
    });
    test( 'should return the correct value if type mouse is present',() => {
        const currentIndex = 0;
        const tranlation = -1
        const maxIndex = 2;
        
        const value = isBoundary(currentIndex, tranlation, maxIndex);
        expect(value).toBeFalsy();
    });
    test( 'should return the correct value if type mouse is present',() => {
        const currentIndex = 0;
        const tranlation = +1
        const maxIndex = 2;
        
        const value = isBoundary(currentIndex, tranlation, maxIndex);
        expect(value).toBeTruthy();
    });
    test( 'should return the correct value if type mouse is present',() => {
        const currentIndex = 1;
        const tranlation = +1
        const maxIndex = 2;
        
        const value = isBoundary(currentIndex, tranlation, maxIndex);
        expect(value).toBeFalsy();
    });
    test( 'should return the correct value if type mouse is present',() => {
        const currentIndex = 2;
        const tranlation = +1
        const maxIndex = 2;
        
        const value = isBoundary(currentIndex, tranlation, maxIndex);
        expect(value).toBeFalsy();
    });
    test( 'should return the correct value if type mouse is present',() => {
        const currentIndex = 1;
        const tranlation = -1
        const maxIndex = 2;
        
        const value = isBoundary(currentIndex, tranlation, maxIndex);
        expect(value).toBeFalsy();
    });
    test( 'should return the correct value if type mouse is present',() => {
        const currentIndex = 2;
        const tranlation = -1
        const maxIndex = 2;
        
        const value = isBoundary(currentIndex, tranlation, maxIndex);
        expect(value).toBeTruthy();
    });
});
