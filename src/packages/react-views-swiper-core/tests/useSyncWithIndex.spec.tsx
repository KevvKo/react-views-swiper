import { SetStateAction, useState, Dispatch } from 'react';
import{ useSyncWithIndex } from '../core/useSyncWithIndex';
import {renderHook, act } from '@testing-library/react';

interface HookResult {
    current: readonly [ 
        number, 
        Dispatch<SetStateAction<number>>, 
        number, 
        Dispatch<SetStateAction<number>>
    ]
}

let hookResult: HookResult;
const startIndex = 0;
const maxIndex = 2;

beforeEach(() => {
    const { result }= renderHook(() => {
        const [index, setIndex ] = useState(startIndex);
        const [currentIndex, setCurrentIndex] = useSyncWithIndex( index, maxIndex);
        
        return [           
            currentIndex, setCurrentIndex,
            index, setIndex
        ] as const;
    });

    hookResult = result;
});

describe('useSyncWithIndex hook', () => {

    it('should be the correct initial value', () => {

        const [ currentIndex ] = hookResult.current; 
        expect(currentIndex).toBe(startIndex);
    });
    it('should change the currentIndex correct', () => {
        const [currentIndex, setCurrentIndex, index, setIndex] = hookResult.current;
        act(() => { setCurrentIndex( index + 1 ); });
        expect(hookResult.current[0]).toBe(1);
        act(() => { setCurrentIndex( index - 1 ) ;});
        expect(hookResult.current[0]).toBe(-1);
    });
    it('should change the currentIndex correct if the initial index changes', () => {
        const [currentIndex, setCurrentIndex, index, setIndex] = hookResult.current;
        act(() => { setIndex(1);});
        expect(hookResult.current[0]).toBe(1);
    });
    it('should set the current index to start index, if the current index is greater then the max index', () => {
        const [currentIndex, setCurrentIndex, index, setIndex] = hookResult.current;
        act(() => { setCurrentIndex(2);});
        act(() => { setIndex(1);});
        expect(hookResult.current[0]).toBe(0);
    });
    it('should set the current index equal to the max index, if the current index is synced in negative direction', () => {
        const [currentIndex, setCurrentIndex, index, setIndex] = hookResult.current;
        act(() => { setIndex(2);});
        expect(hookResult.current[0]).toBe(maxIndex);
    });
});