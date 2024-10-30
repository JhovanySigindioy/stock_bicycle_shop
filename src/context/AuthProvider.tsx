import React, { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

    const login = (): void => {
        setIsAuthenticated(true)
    };

    const logout = (): void => {
        setIsAuthenticated(false)
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};