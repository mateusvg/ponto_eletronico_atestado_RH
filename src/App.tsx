import {
  BrowserRouter,
} from 'react-router-dom';

import SideNavBar from './components/SideBarNav'
import LoginPage from '../src/pages/Login'

import { useState } from 'react';
import { Login } from "./contexts/Login";

function App() {
  const [login, setLogin] = useState(false);
  return (


    <BrowserRouter>
      <Login.Provider value={{ login, setLogin }}>

        {login ? <SideNavBar /> : <LoginPage />}
      </Login.Provider>

    </BrowserRouter>

  );
}

export default App;
