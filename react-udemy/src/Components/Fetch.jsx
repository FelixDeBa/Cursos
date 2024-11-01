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

    // eslint-disable-next-line
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


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
        var url=urlBase+search.toLowerCase()+"/";
        const res=await fetch(url)
        if(res.status === 404){
            alert('Error en el nombre del pokemon')
        }else if(res.status === 200){
                const data=await res.json()
                                
                const tipo1= await fetch(data.types[0].type.url);
                
                if(tipo1.status === 200){
                        const dataTipo1 = await tipo1.json()
                        console.log(dataTipo1)
                        if(dataTipo1.sprites){
                            setPrimType(dataTipo1.sprites['generation-viii']['legends-arceus'].name_icon)
                        }else{
                            setPrimType('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/'+dataTipo1.id+'.png')
                        }
                }
                if(data.types.length === 2){
                    const tipo2= await fetch(data.types[1].type.url);
                    if(tipo2.status === 200){
                        const dataTipo2 = await tipo2.json()
                        if(dataTipo2.sprites){
                            setSecType(dataTipo2.sprites['generation-viii']['legends-arceus'].name_icon)
                        }else{
                            setSecType('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/'+dataTipo2.id+'.png')
                        }
                    }
                }else{
                    setSecType('')
                }

                
                var nombre=data.name
                
                nombre = nombre[0].toUpperCase()+nombre.substring(1)
                console.log(nombre)
                setPokemon(nombre)
                
                // console.log(data.name)
                // console.log(data.name[0])
                setPokedexNo(data.order)
                setImage(data.sprites.other['official-artwork'].front_default)
                
            }
        
        
    }

    const handleSearch=(e)=>{
        var key=e.keyCode || e.which;
        if (key===13){
           console.log("buscando");
           handlePokemonChange()
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
            <div className="pokemon-types">
                <span> 
                {/* eslint-disable-next-line*/}
                  <img className="pokemon-type-icon" src={primType}/>
                  {/* eslint-disable-next-line*/}
                  {!(secType === '')?<img src={secType} className="pokemon-type-icon"/>:false}
                    
                </span>    
            </div>  
            <div className="search-pokemon">
                <textarea onChange={handleSearchChange} id="pokemon-txt" className="search-pokemon-txt" onKeyDown={handleSearch} placeholder="Buscar por Nombre"></textarea>
                {/* <button type="search" onClick={}><i className="bi bi-search btn-search-pokemon"></i></button>     */}
            </div>      
        </div>
        </>
  )
}

export default Fetch

