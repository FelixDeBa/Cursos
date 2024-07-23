
import logo from '../logo.svg';
import React,{Fragment,Component} from 'react'

class ComponenteClase extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        const borde={
                border:"5px solid #555"
        }
        return (     
            <Fragment>
                <>
                <style>
                    
                </style>
                <h1>Programa desde React con componentes de clase</h1>
                <div class="flex justify-center items-center">
                <img 
                src={logo}
                width="40%"
                alt="logo"
                class="imagen-grande-centrada"
                style={borde}
                />
                </div>
                </>
            </Fragment> 
        );
    }
}
 
export default ComponenteClase;