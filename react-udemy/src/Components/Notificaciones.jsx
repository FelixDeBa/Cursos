import React from 'react'

const Notificaciones = (props) => {
    if(props.cambioEstado === true){
        console.log('El estado es verdadero')
    }
    const llamaApp=() =>{
        props.llamadaAApp()
    }

    const llamaDashboard=()=>{
        props.llamadaADashboard()
    }

    return (
        <>
        Ultima brecha
        <button onClick={llamaApp}>Llamar App</button>
        <button onClick={llamaDashboard}>Llamar Dashboard</button>
        </>
    )
}

export default Notificaciones