import React from 'react'
import Componente1 from './Rutas/Componente1'
import Componente2 from './Rutas/Componente2'
import Componente3 from './Rutas/Componente3'
import RutasDinamicas from './RutasDinamicas'
import {BrowserRouter, Route,Routes, NavLink} from 'react-router-dom'
// Tambin existe Switch dentro de react-router-dom para evitar usar exact pero solo para eso aparentemente
// Tambin esta el Link pero no deja poner estilos condicionales

const PadreRutas = () => {
  return (
    <>
    <div id="" className="default-card">

        <BrowserRouter>
            <ul className='navbar-list'>
                    <li><NavLink className={({isActive}) => isActive ? "estiloLink": ""} exact="true" to="/"><i className="bi bi-house-door"></i></NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? "estiloLink": ""} to="/pagina2">2</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? "estiloLink": ""} to="/pagina3">3</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? "estiloLink": ""} to="/pagina4">4</NavLink></li>
            </ul>
            <Routes>
            
                <Route path="/" exact Component={Componente1}/>
                <Route path="/pagina2" sensitive Component={Componente2}/>
                <Route path="/pagina3" Component={Componente3}/>
                <Route path="/pagina4" Component={()=>
                    <>
                        <p className='alternate-big-title'>Componente 4</p>
                    </>
                    }>
                </Route>
                <Route path='/users/:id' Component={RutasDinamicas}/>
            </Routes>    
        </BrowserRouter>
    
        
        <hr/>
    </div>
    </>
  )
}

export default PadreRutas