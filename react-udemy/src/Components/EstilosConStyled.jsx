import React,{Component, Fragment} from "react";
import styled,{keyframes} from 'styled-components'
import './variables.css'

class EstilosConStyles extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        const fondoTexto={
            color:'rgb(190,190,100)'
        }

        const animaTexto=keyframes`
            from{
                color:green;
            }
            to{
                color:red;
            }
        `

        const Titulo=styled.h1`
         color:rgb(150,150,150);
         font-size:29px;
         text-align: center;
         background-color:${fondoTexto.color};

         &:hover{
            color:orangered;
         }

         @media(max-width:800px){
            color: transparent;
         }

         animation:${animaTexto} 1s linear
        `
        //Investigar Media Querys de CSS para utilizar el @media

        const Cabecera=styled.header`
            height:var(--altoHeader);
            background-color:var(--colorHeader);
            width:var(--anchoHeader);
        `
        

        return ( <>
        <Cabecera>
            <Titulo>
                Componentes de Styled Components
            </Titulo>
        </Cabecera>
        </> );
    }
}
 
export default EstilosConStyles;