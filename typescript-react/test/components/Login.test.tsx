import ReactDOM  from 'react'
import { Login } from '../../src/components/Login'
import { render } from 'react-dom'

describe('Login Component Test Suite', ()=>{

    let container: HTMLDivElement
    const authServiceMock = {
        login:jest.fn()
    }

    const setUserMock = jest.fn()

    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container);
        render
        (
            <Login authService={authServiceMock as any} setUser={setUserMock}/>,
            container
        )
    })

    // beforeAll(()=>{
    //     console.log('before all')
    // })

    // afterAll(()=>{
    //     console.log('after all')
    // })

    

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
})