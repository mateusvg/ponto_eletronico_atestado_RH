import React from "react";

interface UserProps {
    userId: number;
    setUserId(login: number): void;
}
export const userIdConst = React.createContext<UserProps>({
    userId: 0,
    setUserId: () => { },
});