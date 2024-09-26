import React,{ useState } from 'react'

const RenderizadoCondicional = () => {
    const[nombre, setNombre]=useState(null)
    const[email, setEmail]=useState(null)
    const[passwd, setPasswd]=useState(null)

    const nombreRegex=/^[a-zA-Z ]{3,16}$/
    // eslint-disable-next-line no-useless-escape
    const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwdRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,}$/


    const valorNombre=(nombreValidar)=>{
        if(nombreValidar.trim()){
            if(nombreRegex.test(nombreValidar)){
                setNombre(true)
            }else{
                setNombre(false)
            }
        }
    }

    const valorEmail=(emailValidar)=>{
        if(emailValidar.trim()){
            if(emailRegex.test(emailValidar)){
                setEmail(true)
            }else{
                setEmail(false)
            }
        }
    }

    const valorPasswd=(passwdValidar)=>{
        if(passwdValidar.trim()){
            if(passwdRegex.test(passwdValidar)){
                setPasswd(true)
            }else{
                setPasswd(false)
            }
        }
    }

    const enviar=(e)=>{
        e.preventDefault()

        if(nombre === true && email === true && passwd === true){
            console.log('Datos correctos')
        }else{
            if(!passwd === true){
                console.log('La contraseña no es segura')
            }else{
                console.log('Los datos son incorrectos')
            }
        }

        // setTimeout(()=>{window.location.reload()},5000)
    }
  return (
    <>
        <div class="default-card">
            <p className='alternate-big-title'>Renderizado Condicional</p>
            <hr />
            <form onSubmit={e=>enviar(e)}>
                <label>Nombre</label>
                <p className='input-with-message'><input id="txtNombre" autoComplete="off" onChange={e=>valorNombre(e.target.value)} type="text"/></p>
                {nombre === false ? <p className='error-text-mini'>Escribe un nombre correcto</p>:null}
                {nombre === true || nombre === null ? <div className='spacer-15'></div>:null}
                
                <label>Correo Electronico</label>
                <p className='input-with-message'><input id="txtEmail" autoComplete="off" onChange={e=>valorEmail(e.target.value)} type="email"/></p>
                {email === false ? <p className='error-text-mini'>Escribe un correo electronico valido</p>:null}
                {email === true || email === null ? <div className='spacer-15'></div>:null}

                <label>Contraseña</label>
                <p className='input-with-message'><input id="txtPasswd" autoComplete="off" onChange={e=>valorPasswd(e.target.value)} type="password"/></p>
                {passwd === false ? <p className='error-text-mini'>Escribe una contraseña valida</p>:null}
                {passwd === true || passwd === null ? <div className='spacer-15'></div>:null}
                <button className='submit'>Validar Datos</button>
            </form>
        </div>
    </>
  )
}

export default RenderizadoCondicional