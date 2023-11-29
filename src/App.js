import './App.css';
import Login from './login.js';
import Register from './Register.js';
import Table from './table.js'
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="App">
      
      
      <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/disp' element={<Table/>}></Route>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
