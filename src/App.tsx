import {
  BrowserRouter,
} from 'react-router-dom';

import SideNavBar from './components/SideBarNav'
import LoginPage from '../src/pages/Login'

import { useState } from 'react';
import { Login } from "./contexts/Login";
import { PermissionConst } from "./contexts/PermissionVisibility";
import { userIdConst } from "./contexts/UsersId"

function App() {
  const [login, setLogin] = useState(false);
  const [permission, setPermission] = useState(0);
  const [userId, setUserId] = useState(0)
  const [userName, setUserName]= useState('')
  return (


    <BrowserRouter>
      <userIdConst.Provider value={{ userId, setUserId, userName, setUserName }}>
        <PermissionConst.Provider value={{ permission, setPermission }}>
          <Login.Provider value={{ login, setLogin }}>
            {login ? <SideNavBar /> : <LoginPage />}
          </Login.Provider>
        </PermissionConst.Provider>
      </userIdConst.Provider>
    </BrowserRouter>

  );
}

export default App;
