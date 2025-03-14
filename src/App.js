import './App.css';
import { useState } from 'react';
import axios from 'axios';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes'; 

function App() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    axios.defaults.headers.common['Authorization'] = "Bearer" + (user ? user.jwt_token : "");

  return (
    <div className="App">
      <h1>Social App</h1>
      <AppNav user={user} setUser={setUser}/>
      <AppRoutes user={user} setUser={setUser}/>
    </div>
  );
}

export default App;
