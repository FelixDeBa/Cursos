import { Navbar } from '../../src/components/Navbar'
import  ReactDOM  from 'react-dom'
import { User } from '../../src/model/Model'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { getByTestId } from '@testing-library/react'
import React from 'react'


describe('Navbar test suite', ()=>{
    let container: HTMLDivElement

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove()
    })

    const baseLink = 'http://localhost'

    test('Renderiza correctamentela navbar con usuario', ()=>{
        container= document.createElement('div');
        document.body.appendChild(container);

        const someUser: User = {
            email: 'someemail',
            userName: 'someUserName'
        }

        ReactDOM.render(
        <MemoryRouter>
            <Navbar user={someUser}/>
        </MemoryRouter>
        , container);

        const links = container.querySelectorAll('a');
        expect(links[0].href).toBe(baseLink+'/')
        expect(links[1].href).toBe(baseLink+'/profile')
        expect(links[2].href).toBe(baseLink+'/spaces')
        expect(links[3].href).toBe(baseLink+'/logout')

    })

    test('Renderiza correctamentela navbar con usuario usando test-id', ()=>{
        container= document.createElement('div');
        document.body.appendChild(container);

        const someUser: User = {
            email: 'someemail',
            userName: 'someUserName'
        }
        
        ReactDOM.render(
        <MemoryRouter>
            <Navbar user={someUser}/>
        </MemoryRouter>
        , container);

        const homeLink = getByTestId(container, 'home-link') as HTMLAnchorElement;
        expect(homeLink.href).toBe(baseLink+'/')

        const profileLink = getByTestId(container, 'profile-link') as HTMLAnchorElement;
        expect(profileLink.href).toBe(baseLink+'/profile')

        const spacesLink = getByTestId(container, 'spaces-link') as HTMLAnchorElement;
        expect(spacesLink.href).toBe(baseLink+'/spaces')

        const logoutLink = getByTestId(container, 'logout-link') as HTMLAnchorElement;
        expect(logoutLink.href).toBe(baseLink+'/logout');
    })

    test('Renderiza correctamentela navbar sin usuario usando test-id', ()=>{
        container= document.createElement('div');
        document.body.appendChild(container);

        const someUser: User = {
            email: 'someemail',
            userName: 'someUserName'
        }
        
        ReactDOM.render(
        <MemoryRouter>
            <Navbar user={undefined}/>
        </MemoryRouter>
        , container);

        const homeLink = getByTestId(container, 'home-link') as HTMLAnchorElement;
        expect(homeLink.href).toBe(baseLink+'/')

        const profileLink = getByTestId(container, 'profile-link') as HTMLAnchorElement;
        expect(profileLink.href).toBe(baseLink+'/profile')

        const spacesLink = getByTestId(container, 'spaces-link') as HTMLAnchorElement;
        expect(spacesLink.href).toBe(baseLink+'/spaces')

        const logoutLink = getByTestId(container, 'login-link') as HTMLAnchorElement;
        expect(logoutLink.href).toBe(baseLink+'/login')

    })
})