import { getPositionX } from '../core/getPositionX';
import '@testing-library/jest-dom';

interface Touches {
    clientX: number;
}

interface MockEvent {
    type: string[]
    pageX: number
    touches: Touches[]
}

let mockEvent1: MockEvent;
let mockEvent2: MockEvent;

beforeEach(() => {

    mockEvent1 = {
        type: ['mouse'],
        pageX: 10,
        touches: [ 
            {
                clientX: 20
            }
        ]
    };

    mockEvent2 = {
        type: [],
        pageX: 10,
        touches: [ 
            {
                clientX: 20
            }
        ]
    };
});

describe('getPositionX', () => {
    test( 'should return the correct value if type mouse is present',() => {
        const index = getPositionX(mockEvent1);
        expect(index).toBe(10);
    });
    test( 'should return the correct value for touches if type mouse is missing',() => {
        const index = getPositionX(mockEvent2);
        expect(index).toBe(20);
    });
});
