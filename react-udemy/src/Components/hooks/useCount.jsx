// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'

export const useCount=()=>{
    console.log("hi from custom Hook")
    const [contador, setContador]= useState(0)
    useEffect(()=>{
        let intervalo=setInterval(()=>{setContador(contador<20 ? contador+1:null)},1000)

        return()=>{
            clearInterval(intervalo)
        }
    },[contador])

    return[contador]
}