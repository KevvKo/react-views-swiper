import Swiper from '../components/Swiper';
import View from '../components/View';
import '@testing-library/jest-dom';


beforeEach(() => {

   const mockEvent = {
        type: ['mouse'],
        pageX: 10,
        touches: [ 
            {
                clientX: 20
            }
        ]
    };
});

test( 'getPositionX',() => {

    // const index = getPositionX(mockEvent);
    // expect(index).toBe(10);
});