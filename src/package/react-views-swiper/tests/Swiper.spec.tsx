import React from 'react';
import Swiper from '../components/Swiper';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

let component: any, update: any;

beforeEach(() => {
    const { container, rerender } = render(
        <Swiper>
            <div data-testid='test-child'>abc</div>
            <div data-testid='test-child'>def</div>
            <div data-testid='test-child'>xyz</div>
        </Swiper>
    );

    component = container; 
    update = rerender;
});

describe( 'Swiper Component',() => {
    it('should render properly all childs', () => {
        expect(screen.getByText('abc')).toBeTruthy();
        expect(screen.getByText('def')).toBeTruthy();
        expect(screen.getByText('xyz')).toBeTruthy();
    });

    it('should render all childs with the correct attribute', () => {

        const hiddenViews = component.querySelectorAll('[aria-hidden="true"]');
        const activeView = component.querySelectorAll('[aria-hidden="false"]');

        expect(hiddenViews).toHaveLength(2);
        expect(activeView).toHaveLength(1);
    });
    it('should render only the current view if prop renderOnlyActie is true', () => {

        update(        
            <Swiper renderOnlyActive={true}>
                <div data-testid='test-child'>abc</div>
                <div data-testid='test-child'>def</div>
                <div data-testid='test-child'>xyz</div>
            </Swiper>
        );
        const hiddenViews = component.querySelectorAll('[aria-hidden="true"]');
        const activeView = component.querySelectorAll('[aria-hidden="false"]');

        expect(hiddenViews).toHaveLength(0);
        expect(activeView).toHaveLength(1);
    });
    it('should render the correct view regarding to the passed index', () => {
        let view = component.querySelector('[aria-hidden="false"]');
        expect(view).toContainHTML('abc');
        update(        
            <Swiper index={2}>
                <div data-testid='test-child'>abc</div>
                <div data-testid='test-child'>def</div>
                <div data-testid='test-child'>xyz</div>
            </Swiper>
        );

        view = component.querySelector('[aria-hidden="false"]');
        expect(view).toContainHTML('xyz');
    });
    it('should change the current view on swipe', () => {

        const options1 = { touches: [{ clientX: 300 }]};
        const options2 = { touches: [{ clientX: 0 }]};

        let viewElement = component.querySelector('[aria-hidden="false"]');
        expect(viewElement).toContainHTML('abc');

        fireEvent.touchStart(viewElement, options1 );
        fireEvent.touchMove(viewElement, options2);
        fireEvent.touchEnd(viewElement);

        viewElement = component.querySelector('[aria-hidden="false"]');
        expect(viewElement).toContainHTML('def');

        fireEvent.touchStart(viewElement, options1 );
        fireEvent.touchMove(viewElement, options2 );
        fireEvent.touchEnd(viewElement);

        viewElement = component.querySelector('[aria-hidden="false"]');
        expect(viewElement).toContainHTML('xyz');

        // repeat previous test to show, that the view can not change, if the last view is already reached
        fireEvent.touchStart(viewElement, options1 );
        fireEvent.touchMove(viewElement, options2 );
        fireEvent.touchEnd(viewElement);

        viewElement = component.querySelector('[aria-hidden="false"]');
        expect(viewElement).toContainHTML('xyz');

        fireEvent.touchStart(viewElement, options2 );
        fireEvent.touchMove(viewElement, options1);
        fireEvent.touchEnd(viewElement);
        fireEvent.touchStart(viewElement, options2 );
        fireEvent.touchMove(viewElement, options1 );
        fireEvent.touchEnd(viewElement);

        viewElement = component.querySelector('[aria-hidden="false"]');
        expect(viewElement).toContainHTML('abc');
    });
    it('should invoke the callback in index is changed', () => {

        const mockFunction = jest.fn();

        update(        
            <Swiper index={2} onIndexChanged={mockFunction}>
                <div data-testid='test-child'>abc</div>
                <div data-testid='test-child'>def</div>
                <div data-testid='test-child'>xyz</div>
            </Swiper>
        );

        expect(mockFunction).toHaveBeenCalledTimes(1);
    });
});