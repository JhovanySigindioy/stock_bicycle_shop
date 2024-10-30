import React, { createContext } from "react";

export interface AuthContext {
    isAuthenticated: boolean,
    login: () => void;
    logout: () => void;
}

export const AuthContext: React.Context<AuthContext> = createContext<AuthContext>({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
}); 