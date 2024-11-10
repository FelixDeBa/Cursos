import React from 'react';
import { SpaceComponent } from '../../../src/components/spaces/SpacesComponents'

import ReactDOM from 'react-dom'
import { fireEvent } from '@testing-library/react';

describe('SpaceComponents test suite', () => {
    let container: HTMLDivElement;
    const reserveSpaceMock = jest.fn()

    function cleanUpTests() {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    }

    function setUpTests(element: React.FunctionComponentElement<any>) {
        container = document.createElement('div')
        document.body.appendChild(container);
        ReactDOM.render(element, container)
    }

    describe('Test con URL de imagen', () => {
        beforeEach(() => {
            setUpTests(
                <SpaceComponent
                    location={'someLocation'}
                    name={'someName'}
                    reserveSpace={reserveSpaceMock}
                    spaceId={'111'}
                    photoUrl={'someUrl.jpg'}
                />)
        })

        test('Muestra la imagen correcta', () => {
            const image = container.querySelector('img');
            expect(image!).toBeInTheDocument();
            expect(image!.src).toBe('http://localhost/someUrl.jpg')
        })

        test('Muestra los textos correctos', () => {
            const label = container.querySelectorAll('label');
            expect(label[0]).toHaveTextContent('someName');
            expect(label[1]).toHaveTextContent('111');
            expect(label[2]).toHaveTextContent('someLocation');

        })
    
        test('Boton para reservar hotel', () => {
            const boton = container.querySelector('button');
            fireEvent.click(boton!);
            expect(reserveSpaceMock).toHaveBeenCalledWith('111')

        })

        afterEach(() => {
            cleanUpTests();
        })
    })

    describe('Test sin URL de imagen', () => {
        beforeEach(() => {
            setUpTests(
                <SpaceComponent
                    location={'someLocation'}
                    name={'someName'}
                    reserveSpace={reserveSpaceMock}
                    spaceId={'111'}
                />)
        })

        test('Muestra la imagen por Defecto correcta', () => {
            const image = container.querySelector('img');
            expect(image!).toBeInTheDocument();
            expect(image!.src).toBeFalsy();
        })

        afterEach(() => {
            cleanUpTests();
        })
    })
})