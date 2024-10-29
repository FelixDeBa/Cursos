import React,{ useState, useEffect } from 'react'
import style from './Playing.module.css'
import { Preguntas } from '../Helpers/BD.jsx'


const Playing = () => {
    const[aleatorio, setAleatorio]=useState(Math.round(Math.random()*100))
    const[vidas,setVidas]=useState(5)
    const[puntuacion,setPuntuacion]=useState(0)
    const[time,setTime]=useState(20)
    const[clase,setClase]=useState([style.naturaleza,style.cultura,style.arte, style.deportes,style.viajes])
    const[gameOver, setGameOver]=useState(null)


    useEffect(()=>{
        let cuentaAtras=setInterval(()=>{time>0 ? setTime(time-1) : setGameOver(window.location.href='/gameover')}, 1000)

        return()=>clearInterval(cuentaAtras)
    },[time])

    const bien=()=>{
        speechSynthesis.speak(new SpeechSynthesisUtterance('¡¡¡RESPUESTA CORRECTA!!!'))
        setAleatorio(Math.round(Math.random()*100))
        setPuntuacion(puntuacion+1)
        setTime(20)
    }
    const mal=()=>{
        speechSynthesis.speak(new SpeechSynthesisUtterance('¡¡¡RESPUESTA INCORRECTA!!!'))
        setAleatorio(Math.round(Math.random()*100))
        setPuntuacion(puntuacion-1)
        setVidas(vidas>1 ? vidas-1 : setGameOver(window.location.href='/gameover'))
        setTime(20)
    }

    return (
        <>
        {Preguntas.map(pregunta=>(
            pregunta.id===aleatorio ?
            <>
            <div className={style.countContainer}>
                <h2>Time: {time}</h2>
                <h2>Points: {puntuacion}</h2>
                <h2>Trys: {vidas}</h2>
            </div>
            <div className={style.imgContainer}>
                <div className={pregunta.estilos==='naturaleza'?clase[0]:
                                pregunta.estilos==='cultura'?clase[1]:
                                pregunta.estilos==='arte'?clase[2]:
                                pregunta.estilos==='deportes'?clase[3]:
                                pregunta.estilos==='viajes'?clase[4]:clase[0]
                }></div>
            </div>
            <div className={style.preguntaContainer}>
                <h3>{pregunta.pregunta}</h3>
                <p className={style.catText}>Categoria: {pregunta.estilos}</p>
            </div>
            <div className={style.buttonContainer}>
                <button className={style.boton} onClick={pregunta.respuesta1===pregunta.solucion ? bien : mal}>{[pregunta.respuesta1]}</button>
                <button className={style.boton} onClick={pregunta.respuesta2===pregunta.solucion ? bien : mal}>{[pregunta.respuesta2]}</button>
                <button className={style.boton} onClick={pregunta.respuesta3===pregunta.solucion ? bien : mal}>{[pregunta.respuesta3]}</button>
            </div>
            </>
            :null
        ))}
        </>
    )
}

export default Playing