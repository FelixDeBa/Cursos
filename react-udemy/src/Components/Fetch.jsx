import React, { useState, useEffect } from 'react'
const urlBase="https://pokeapi.co/api/v2/pokemon/goodra/"

const Fetch = () => {
    const [pokemon, setPokemon]=useState([])

    useEffect(()=>{
        const cargarPokemons=async()=>{
            const res=await fetch(urlBase)
        }        
        cargarPokemons()
    
    },[])

    return (
        <>
        <div id="" className="default-card">
                <p className='alternate-big-title'>Pokedex con Fetch</p>
                <hr />
                <p className="news-text">
                Se deshabilito temporalmente debido a un error con la libreria
                </p>
                
            </div>
        </>
  )
}

export default Fetch