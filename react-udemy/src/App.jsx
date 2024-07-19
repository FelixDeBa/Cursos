import ComponenteClase from './Components/ComponenteClase.jsx';
import './App.css';
import Props from './Components/Props.jsx'
import State from './Components/State.jsx'
import EstilosTradicionales from './Components/EstilosTradicionales.jsx';
import EstilosEnLinea from './Components/EstilosEnLinea.jsx';
import EstilosEnModulos from './Components/EstilosEnModulos/';

function App() {
  return (<>
  <EstilosTradicionales/>
  <ComponenteClase></ComponenteClase>
  <EstilosEnModulos></EstilosEnModulos>
  <Props msg="Hola Mundo!"/>
  <State/>
  <EstilosEnLinea/>
  </>    
  );
}

export default App;
