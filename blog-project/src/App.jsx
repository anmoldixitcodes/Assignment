import './App.css'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login';

function App() {
 

  return (
    
     <Router>
      <Routes>
        
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
      </Router> 
    
  )
}

export default App
