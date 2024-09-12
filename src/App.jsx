import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Metronomo from './components/Metrono';
import About from './components/about';
import AppContext from './context/appContext';
import Menu from './components/menu';

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        
        <Menu/>

        <Routes>
          <Route path='/' element={<Metronomo />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
