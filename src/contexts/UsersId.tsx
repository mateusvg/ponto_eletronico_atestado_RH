import React from "react";

interface UserIdProps {
    userId: number;
    setUserId(userId: number): void;
    
    userName: string;
    setUserName(userName: string): void;

}
export const userIdConst = React.createContext<UserIdProps>({
    userId: 0,
    setUserId: () => { },
    userName: '',
    setUserName: () => { },
});