import './App.css';
import Landing from './comps/Landing/Landing';
import Login from './comps/Login/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
