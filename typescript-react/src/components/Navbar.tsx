import React from 'react'
import { User } from '../model/Model'
import { Link } from 'react-router-dom'
import style from './css/Navbar.module.css'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const driverObj=driver({
    showProgress: true,
    steps:[
        { element: '#home', popover: { title: "Pagina de Inicio", description: "Esta es la pagina Home, encontraras informacion basica" } },
        { element: '#profile', popover: { title: "Tu perfil", description: "Aqui puedes ver tu perfil" } },
        { element: '#login', popover: { title: "Iniciar Sesion", description: "Aqui puedes iniciar sesion para acceder a tus programas" } }
    ]
})

export class Navbar extends React.Component<{user:User | undefined}>{
    render(){
        let loginLogout:any
        if(this.props.user){
            loginLogout =<Link to='/logout'>{this.props.user.userName}</Link>
        }else{
            loginLogout =<Link to='/login'>Login</Link>
        }

        return(
            <div className="navbar">
                <Link id="home" to="/">Home</Link>
                <Link id="profile" to="/profile">Profile</Link>
                <Link id="login" to="/login">Login</Link>
                <button onClick={e=> driverObj.drive()}>Tour</button>
            </div>
        )
    }
}