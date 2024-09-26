import React,{useState} from 'react'

const Formularios = () => {
    const[nombre, setNombre]=useState(false)
    const[email, setEmail]=useState(false)
    const[passwd, setPasswd]=useState(false)

    const nombreRegex=/^[a-zA-Z ]{3,16}$/
    // eslint-disable-next-line no-useless-escape
    const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwdRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/


    const valorNombre=(nombreValidar)=>{
        if(nombreValidar.trim()){
            if(nombreRegex.test(nombreValidar)){
                setNombre(true)
            }
        }
    }

    const valorEmail=(emailValidar)=>{
        if(emailValidar.trim()){
            if(emailRegex.test(emailValidar)){
                setEmail(true)
            }
        }
    }

    const valorPasswd=(passwdValidar)=>{
        if(passwdValidar.trim()){
            if(passwdRegex.test(passwdValidar)){
                setPasswd(true)
            }
        }
    }

    const enviar=(e)=>{
        e.preventDefault()

        if(nombre === true && email === true && passwd === true){
            alert('Datos correctos')
        }else{
            if(!passwd === true){
                alert('La contraseña no es segura')
            }else{
                alert('Los datos son incorrectos')
            }
        }

        // setTimeout(()=>{window.location.reload()},5000)
    }

    return (
    <>
        <div class="default-card">
            <form onSubmit={e=>enviar(e)}>
                <p><label>Nombre</label></p>
                <p><input id="txtNombre" onChange={e=>valorNombre(e.target.value)} type="text"/></p>
                <p><label>Correo Electronico</label></p>
                <p><input id="txtEmail" onChange={e=>valorEmail(e.target.value)} type="email"/></p>
                <p><label>Contraseña</label></p>
                <p><input id="txtPasswd" onChange={e=>valorPasswd(e.target.value)} type="password"/></p>
                <input type="submit"/>
            </form>
        </div>
    </>
  )
}

export default Formularios