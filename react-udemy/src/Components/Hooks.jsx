import React,{useEffect, useState} from 'react'

const Hooks = () => {

    const[color,setColor]=useState('#ebf0fc')
    const[contador, setContador]=useState(0)

    useEffect(()=>{
        let intervalo=setInterval(()=>{
            setContador(contador+1)},1000)

        return ()=>{
            clearInterval(intervalo)
        }
    },[contador])

    const fondo={
        borderRadius: "10px",
        width: "auto",
        padding: "3% 5%",
        height: "auto",
        backgroundColor:color,
        margin: "5px"
    }    

    const cambioColor= ()=>{
        if(color === "#ebf0fc")
            setColor('yellow')
        else
            setColor('#ebf0fc')
    }

    return (
        <>
        <div  style={fondo} /*class="default-card"*/>
            <div id="" className="">
                fondo con color por defecto
                <button onClick={cambioColor}>Cambiar Color</button>
            </div>
            <div id="" className="">
                Tiempo que ha estado en ejecucion: {contador}
                {/* <button onClick={cambioColor}>Cambiar Color</button> */}
            </div>
        </div>
        </>
    )
}

export default Hooks