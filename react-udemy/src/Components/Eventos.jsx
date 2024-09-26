import React from 'react'

const enfocar=()=> console.log("Enfocado")
const blur=()=> console.log('Ya no enfocado')
const change=()=> console.log(document.getElementById('inputEventos').value)
const clic=()=> alert("Te dije que no me presionaras")
const dobleClic=()=>alert("¿Y encima me haces doble clic?")
// eslint-disable-next-line no-unused-vars
const teclaPresionada=()=>console.log('Estas escribiendo en el input de Eventos')
const mouseDown=()=>alert('Vas a disparar un evento eh')

const Eventos = () => {
  return (
    <>
        <div class="default-card" onMouseDown={mouseDown}>
          <div className="centered-div">
              <p className='alternate-big-title'>Eventos en React</p>
              <hr />
              <p><input id='inputEventos' onFocus={enfocar} onBlur={blur} onChange={change} type="text"/></p>
              <p><button onClick={clic}>No presionar</button></p>
              <p><button onDoubleClick={dobleClic}>No presionar tampoco</button></p>
            </div>
        </div>
    </>
  )
}

export default Eventos