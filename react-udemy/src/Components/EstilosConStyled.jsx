import React,{Component, Fragment} from "react";
import styled from 'styled-components'
import './variables.css'

class EstilosConStyles extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 

        const Titulo=styled.h1`
         color:green;
         font-size:29px;
        `
    constCabecera=styled.header`

    `

        return ( <>
        <header>
            <Titulo>
                Componentes de Styled Components
            </Titulo>
        </header>
        </> );
    }
}
 
export default EstilosConStyles;