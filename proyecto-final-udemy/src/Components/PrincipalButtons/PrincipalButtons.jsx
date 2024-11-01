import React from 'react'
import style from './PrincipalButtons.module.css'
import { Link } from 'react-router-dom'

const PrincipalButtons = () => {
  return (
    <>
    <div className={style.container}>
        <div className={style.containerEnlace}>
            <Link to='/' className={style.a}>INSTRUCTIONS</Link>
        </div>
        <div className={style.containerEnlace}>
            <Link to='/playing' className={style.a}>PLAY</Link>
        </div>
    </div>
    </>
  )
}

export default PrincipalButtons