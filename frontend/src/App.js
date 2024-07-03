import './App.css';
import Landing from './comps/Landing/Landing';
import Login from './comps/Login/Login';
import Protected from './comps/ProtectedRoute/Protected';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react'; 
import axios from 'axios'; 

const HomePage = () => {
  useEffect(()=>{
    console.log(document.cookie); 
  });

  async function handleJWT() {
    const jwt = document.cookie.substring(document.cookie.indexOf('jwt=')+4)
    const config = {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }; 
    console.log(config);
    const response = await axios.get('http://localhost:8000/test', config); 
    console.log(response.data); 
    document.getElementById('holder').innerHTML = JSON.stringify(response.data); 
  }

  async function handleNonJWT() {
    const config = {
      headers: {'Authorization': `Bearer: nothing`}
    }; 

    const response = await axios.get('http://localhost:8000/test', config); 
    document.getElementById('holder').innerHTML = response; 
  }

  return (
    <>
      <button onClick={handleJWT}>test with jwt</button>
      <button onClick={handleNonJWT}>test without jwt</button>
      <h1>Welcome to Muse</h1>
      <div id='holder'></div>
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/museum' element={<Protected component={HomePage}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
