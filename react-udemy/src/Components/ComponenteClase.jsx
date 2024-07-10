
import logo from '../logo.svg';
import React,{Fragment,Component} from 'react'

class ComponenteClase extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (     
            <Fragment>
                <>
                <h1>Hola Mundo</h1>
                <div class="flex justify-center items-center">
                <img 
                src={logo}
                width="40%"
                alt="logo"
                class="center"
                />
                </div>
                </>
                <>
                <p>Programa desde React con componentes de clase</p>
                </>
            </Fragment> 
        );
    }
}
 
export default ComponenteClase;