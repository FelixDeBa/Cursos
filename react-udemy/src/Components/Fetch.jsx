import React, { useState } from 'react'
// import MissingNo from './img/MissingNo.jpg'

const urlBase="https://pokeapi.co/api/v2/pokemon/"





const Fetch = () => {
    const [search, setSearch]=useState('goodra')
    const [pokemon, setPokemon]=useState('MissigNo')
    const [image, setImage]=useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png')
    const [types, setTypes]=useState([{"type":'undef'}, {"type":'undef'}])
    const [pokedexNo,setPokedexNo]=useState('?')

    const handlePokemonChange=(e)=>{
        setSearch(e.target.value)
    }

    const buscarPkmn=async()=>{
        var url=urlBase+search+"/";
        const res=await fetch(url)
        const data=await res.json()
        console.log(data)

        setPokemon(data.name)
        setPokedexNo(data.id)
        setTypes(data.types)
        setImage(data.sprites.other['official-artwork'].front_default)
    }   

    return (
        <>
        <div id="" className="pokedex-card">
            <div className="luces-pokedex">
                <div className="luz1"></div>
                <div className="luz2"></div>
            </div>
            <div className="separador-pokedex">
                <div className="circulo-azul-pokedex"><span className='reflejo-circular'></span></div>
                <div className='linea'></div>
            </div>
            <div className="pokemon-image-frame">
                <img 
                className="pokemon-image"
                src={image}
                alt="Pokemon encontrado"
                
                />
            </div>
                
            <div className="pokemon-name-title">
                #{pokedexNo}. {pokemon}
            </div>
            <div className="pokemon-types">
                {(types).map(type =>(
                  <span key={type.type.name}>{type.type.name} </span>
                ))}
            </div>
            <div className="search-pokemon-bar">
                <span>
                    <input type="text" onChange={handlePokemonChange} id="pokemon-txt" placeholder="Buscar por Nombre"/>
                    <button type="search" onClick={buscarPkmn}><i className="bi bi-search btn-search-pokemon"></i></button>
                </span>    
            </div>        
        </div>
        </>
  )
}

export default Fetch