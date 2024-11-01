import React from 'react';
import './App.css';
import { User } from '../model/Model'
import { AuthService } from '../services/AuthService';
import { Login } from './Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
// import history from '../utils/history';
import { Navbar } from './Navbar';
import Home from './Home';
import { Profile } from './Profile';

interface AppState{
  user:User | undefined
}

export class App extends React.Component<{},AppState>{
  private authService:AuthService = new AuthService();

  constructor(props: any){
    super(props)
    this.state={
      user:undefined
    }
    this.setUser = this.setUser.bind(this)
  }

  private setUser(user:User){
    this.setState({
      user: user
    })
    console.log('El usuario es ' + user)
  }

  render(){
    return(
      <div className='wrapper'>
      {/* <Login authService={this.authService} setUser={this.setUser}/> */}
      <BrowserRouter>
      <Navbar user={this.state.user}></Navbar>
        <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="/login" element={
            <Login authService={this.authService} setUser={this.setUser}/>
          }/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
            
          
      </div>
    );

  }
}

export default App;
