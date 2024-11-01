// import logo from './logo.svg';
import './App.css';
import PrincipalPage from './Components/PrincipalPage';
import PrincipalButtons from './Components/PrincipalButtons';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Playing from './Components/Playing';
import GameOver from './Components/GameOver';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={
            <>
            <PrincipalPage />
            <PrincipalButtons />
            </>
            } />
          <Route path="/playing" element={<Playing />} />
          <Route path="/gameover" element={<GameOver />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
