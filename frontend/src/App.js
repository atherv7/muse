import './App.css';
import Landing from './comps/Landing/Landing';
import Login from './comps/Login/Login';
import ProtectedRoute from './comps/ProtectedRoute/ProtectedRoute';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
const HomePage = () => <h1>Welcome to Muse</h1>
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <ProtectedRoute path='/museum' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
