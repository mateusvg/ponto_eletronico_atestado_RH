import React from "react";

interface PermissionProps {
    permission: number;
    setPermission(login: number): void;
}
export const PermissionConst = React.createContext<PermissionProps>({
    permission: 0,
    setPermission: () => { },
});