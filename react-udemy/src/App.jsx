import './App.css';
import Dashboard from './Components/Dashboard.jsx';
import Notificaciones from './Components/Notificaciones.jsx';
import { useState } from 'react';


function App() {
  const [estado,setEstado]=useState(false)
  const estadoComponente=()=>{
    if(!estado){
      setEstado(true)
    }else{
      setEstado(false)
    }
  }

  const llamadaDeNotif=()=>{
    console.log('Llamada a la app desde las notificaciones')
  }

  const llamandoDashboard=()=>{
    setEstado(true)
  }

  return (<>
  
  <Notificaciones llamadaADashboard={llamandoDashboard} llamadaAApp={llamadaDeNotif} cambioEstado={estado} />
  <Dashboard llamadaDeNotif={llamandoDashboard} nuevoEstado={estado} />
  <button onClick={estadoComponente}>Presiona aqui</button>
  </>    
  );
}

export default App;
