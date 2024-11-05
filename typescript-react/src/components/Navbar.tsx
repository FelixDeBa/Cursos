import React from 'react'
import { User } from '../model/Model'
import { Link } from 'react-router-dom'
// import style from './css/Navbar.module.css'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'


export class Navbar extends React.Component<{user:User | undefined}>{
    
    render(){
        const driverObj=driver({
            showProgress: true,
            steps:[
                { element: '#home', popover: { title: "Pagina de Inicio", description: "Esta es la pagina Home, encontraras informacion basica" } },
                { element: '#profile', popover: { title: "Tu perfil", description: "Aqui puedes ver tu perfil" } },
                (!this.props.user)?{ element: '#login', 
                    popover: { title: "Iniciar Sesion", 
                        description: "Aqui puedes iniciar sesion para acceder a tus programas" } }:{ element: '#userName', 
                    popover: { title: "Tu usuario", 
                        description: "Aqui Se muestra el usuario con el que te autenticaste" } }
            ]
        })
        let loginLogout:any
        if(this.props.user){
            loginLogout =<Link id='userName' to='/logout' style={{float:'right'}}>{this.props.user.userName}</Link>
        }else{
            loginLogout =<Link id='login' to='/login' style={{float:'right'}}>Login</Link>
        }

        return(
            <div className="navbar">
                <Link id="home" to="/">Inicio</Link>
                <Link id="profile" to="/profile">Perfil</Link>
                <Link id="spaces" to="/spaces">Hoteles</Link>
                {loginLogout}
                <button style={{float:'right'}} onClick={e=> driverObj.drive()}>Tour</button>
            </div>
        )
    }
}