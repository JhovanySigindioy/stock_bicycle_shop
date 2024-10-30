import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React, { ReactNode } from "react";
import { purpleTheme } from "./purpleTheme";

export const AppTheme: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
