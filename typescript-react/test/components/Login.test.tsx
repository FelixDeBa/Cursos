import * as ReactDOM from 'react-dom'
import {act}  from 'react'
import { Login } from '../../src/components/Login'
import { fireEvent, waitFor } from '@testing-library/react';
import { User } from '../../src/model/Model';
import history from '../../src/utils/history';


const someUser:User={
    userName: 'someUser',
    email: 'someemail@example.com'
}
describe('Login Component Test Suite', ()=>{

    let container: HTMLDivElement
    const authServiceMock = {
        login:jest.fn()
    }

    const setUserMock = jest.fn()
    const historyMock = history;
    history.push = jest.fn();

    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container);
        // render(<Login authService={authServiceMock as any} setUser={setUserMock}/>)
        ReactDOM.render(<Login authService={authServiceMock as any} setUser={setUserMock}/>,
            container
        )

    })   

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    })
    
    test('Se renderiza correctamente el documento inicial', ()=>{
        const title = document.querySelector('h2');
        expect(title!.textContent).toBe('Login into your Account');

        const inputs = document.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].value).toBe('');
        expect(inputs[1].value).toBe('');
        expect(inputs[2].value).toBe('Login');

        const label = document.querySelector('label');
        expect(label).not.toBeInTheDocument();
    })

    test('Las credenciales se pasan correctamente', ()=>{
        const inputs = document.querySelectorAll('input');
        const loginInput=inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePass'}});
        fireEvent.click(loginButton);
        
        expect(authServiceMock.login).toBeCalledWith(
            'someUser',
            'somePass'
        )
    })

    test('Se gestiona el login success de manera correcta', async()=>{
        authServiceMock.login.mockResolvedValueOnce(someUser);
        const inputs = document.querySelectorAll('input');
        const loginInput=inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePass'}});
        fireEvent.click(loginButton);

        const statusLabel = await waitFor(()=> container.querySelector('label'))
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login successful');
        expect(setUserMock).toBeCalledWith(someUser)
        expect(historyMock.push).toBeCalledWith('/profile')
    })

    test('Se gestiona el login fallido de manera correcta', async()=>{
        authServiceMock.login.mockResolvedValueOnce(undefined);
        const inputs = document.querySelectorAll('input');
        const loginInput=inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePass'}});
        fireEvent.click(loginButton);

        const statusLabel = await waitFor(()=> container.querySelector('label'))
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login failed!!!');
    })
})