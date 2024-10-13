import React, { useState } from 'react'

const urlBase="https://pokeapi.co/api/v2/pokemon/"





const Fetch = () => {
    const [search, setSearch]=useState('goodra')
    const [pokemon, setPokemon]=useState('MissigNo')
    const [image, setImage]=useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png')
    // const [types, setTypes]=useState([])
    const [pokedexNo,setPokedexNo]=useState('?')
    const [primType, setPrimType]=useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/1.png')
    const [secType, setSecType]=useState('')

    const handleSearchChange=(e)=>{
        setSearch(e.target.value)
    }

    // const handlePokemonTypes=async(typesUrl)=>{
    //     let types = []
    //     typesUrl.map(async url=>{
    //         const res= await fetch(url)
    //         if(res.status === 200){
    //             const data = await res.json()
    //             types.push(data.sprites['generation-viii']['legends-arceus'].name_icon)
    //         }
    //     })
    //     console.log(types)
    //     setTypes(types)
    // }

    const handlePokemonChange=async()=>{
        var url=urlBase+search+"/";
        const res=await fetch(url)
        if(res.status === 404){
            alert('Error en el nombre del pokemon')
        }else{
            if(res.status === 200){
                const data=await res.json()
                console.log(data.types[0])
                const tipo1= await fetch(data.types[0].type.url);
                if(tipo1.status === 200){
                        const dataTipo1 = await tipo1.json()
                        setPrimType(dataTipo1.sprites['generation-viii']['legends-arceus'].name_icon)
                }
                if(data.types.length === 2){
                    const tipo2= await fetch(data.types[1].type.url);
                    if(tipo2.status === 200){
                        const dataTipo2 = await tipo2.json()
                        setSecType(dataTipo2.sprites['generation-viii']['legends-arceus'].name_icon)
                    }
                }else{
                    setSecType('')
                }

                
                
                setPokemon(data.name)
                setPokedexNo(data.order)
                setImage(data.sprites.other['official-artwork'].front_default)
                
            }
        }
        
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
            Tipos:
            <div className="pokemon-types">
                <span> 
                {/* eslint-disable-next-line*/}
                  <img src={primType}/>
                  {/* eslint-disable-next-line*/}
                  <img src={secType}/>
                </span>
            </div>
            <div className="search-pokemon-bar">
                <span>
                    <input type="text" onChange={handleSearchChange} id="pokemon-txt" placeholder="Buscar por Nombre"/>
                    <button type="search" onClick={handlePokemonChange}><i className="bi bi-search btn-search-pokemon"></i></button>
                </span>    
            </div>        
        </div>
        </>
  )
}

export default Fetch

