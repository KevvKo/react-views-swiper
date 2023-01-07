import React from 'react';
import View from '../components/View.Component';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe( 'View Component',() => {

    it('should render', () => {
        render( < View />);
    });
    it('should render the passed children', () => {
        render( 
            <View>
                <span>test</span>
            </View>
        );
        expect(screen.getByText('test')).toBeTruthy();
    });
    it('should render the correct hidden value', () => {
        const { container, rerender } = render(<View />);
        expect(container.querySelector('[aria-hidden="false"]')).toBeTruthy();
        rerender(<View hidden={true} />);
        expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
    });
    it('should add and remove the grabbing class during touch events', () => {

        const options = { touches: [{ clientX: 100 }]};

        const { container } = render( 
            <View>
                <span>test</span>
            </View>
        );
        const viewElement = container.querySelector('[aria-hidden="false"]')!;


        fireEvent.touchStart(viewElement, options );
        expect(viewElement.className).toContain('grabbing');
        fireEvent.touchEnd(viewElement, options);
        expect(viewElement.className).not.toContain('grabbing');
    });
    it('should add and remove the grabbing class during mouse events', () => {

        const options = { pageX: 100 };

        const { container } = render( 
            <View>
                <span>test</span>
            </View>
        );

        const viewElement = container.querySelector('[aria-hidden="false"]')!;

        fireEvent.mouseDown(viewElement, options );
        expect(viewElement).toHaveClass('grabbing');
        fireEvent.mouseUp(viewElement, options);
        expect(viewElement).not.toHaveClass('grabbing');
        fireEvent.mouseDown(viewElement, options );
        expect(viewElement).toHaveClass('grabbing');
        fireEvent.mouseLeave(viewElement, options);
        expect(viewElement).not.toHaveClass('grabbing');
    });
    it('should ', () => {
        const mockTranslation = 50;
        const mockSetTranslation = jest.fn();
        render(<View />);

    });
    it('should call the translation function', () => {
        const options = { pageX: 100 };
        const setTranslation= jest.fn();
        
        const { container } = render(<View />);
        const viewElement = container.querySelector('[aria-hidden="false"]')!;

        fireEvent.mouseMove(viewElement, options);
        expect(setTranslation).toHaveBeenCalledTimes(0);

        fireEvent.mouseDown(viewElement, options);
        fireEvent.mouseMove(viewElement, options);
        fireEvent.mouseLeave(viewElement, options);

        expect(setTranslation).toHaveBeenCalledTimes(2);
    });
    it('should contain the correct translation value on update', () => {
        const { container, rerender } = render(<View />);
        const viewElement = container.querySelector('[aria-hidden="false"]')!;

        expect(viewElement).toHaveStyle({ 'transform': 'translateX(0px)'});

        rerender(<View />);
        expect(viewElement).toHaveStyle({ 'transform': 'translateX(50px)'});
    });
    it('should contain the correct left value on current index update', () => {
        const { container, rerender } = render(<View />);
        const viewElement = container.querySelector('[aria-hidden="false"]')!;

        expect(viewElement).toHaveStyle({ 'left': '-0px'});

        rerender(<View />);
        expect(viewElement).toHaveStyle({ 'left': '-0px'});
    });
});