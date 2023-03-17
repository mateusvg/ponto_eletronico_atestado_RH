import {
  BrowserRouter,
} from 'react-router-dom';

import SideNavBar from './components/SideBarNav'
import LoginPage from '../src/pages/Login'

import { useState } from 'react';
import { Login } from "./contexts/Login";
import { PermissionConst } from "./contexts/PermissionVisibility";

function App() {
  const [login, setLogin] = useState(false);
  const [permission, setPermission] = useState(0);
  return (


    <BrowserRouter>
      <PermissionConst.Provider value={{ permission, setPermission }}>
        <Login.Provider value={{ login, setLogin }}>
          {login ? <SideNavBar /> : <LoginPage />}
        </Login.Provider>
      </PermissionConst.Provider>

    </BrowserRouter>

  );
}

export default App;
