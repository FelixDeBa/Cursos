import ComponenteClase from './Components/ComponenteClase.jsx';
import './App.css';
import Props from './Components/Props.jsx'
import State from './Components/State.jsx'

function App() {
  return (<>
  <ComponenteClase></ComponenteClase>
  <Props msg="Hola Mundo!"/>
  <State/>
  </>    
  );
}

export default App;
