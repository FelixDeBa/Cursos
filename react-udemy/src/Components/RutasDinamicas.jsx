import React from 'react'
import { useParams } from 'react-router-dom'

const RutasDinamicas = () => {
    const user = useParams()
    return (
    <>
    <div className='card-component'>
        <p className='card-component-title'>Componente Dinamico</p>
        <hr/>
        <h3>{user.name}</h3>
        <p>
          Usuario #{user.id}
        </p>
        </div>
    </>
  )
}

export default RutasDinamicas