import ComponenteClase from './Components/ComponenteClase.jsx';
import './App.css';
import Props from './Components/Props.jsx'
import State from './Components/State.jsx'
import EstilosTradicionales from './Components/EstilosTradicionales.jsx';
import EstilosEnLinea from './Components/EstilosEnLinea.jsx';

function App() {
  return (<>
  <EstilosTradicionales/>
  <ComponenteClase></ComponenteClase>
  <Props msg="Hola Mundo!"/>
  <State/>
  <EstilosEnLinea/>
  </>    
  );
}

export default App;
