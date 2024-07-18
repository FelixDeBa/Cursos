import React,{Fragment,Component} from 'react'
import './EstilosTradicionales.css'
import './css/estiloDesdeCarpeta.css'

class EstilosTradicionales extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( <>
        <header>
            <h1 class="titulo">
                Titulo de estilos Tradicionales
            </h1>
        </header>
        </> );
    }
}
 
export default EstilosTradicionales;