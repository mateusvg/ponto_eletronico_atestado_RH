import React from "react";

interface LoginProps {
    login: boolean;
    setLogin(login: boolean): void;
}
export const Login = React.createContext<LoginProps>({
    login: false,
    setLogin: () => { },
});