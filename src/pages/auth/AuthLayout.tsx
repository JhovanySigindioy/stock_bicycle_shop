import { Grid2, Typography } from "@mui/material";
import React, { ReactNode } from "react";

export const AuthLayout: React.FC<{ children: ReactNode, title: string }> = ({ children, title }) => {
    return (
        <Grid2
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: "100vh",
                backgroundColor: "primary.main",
                padding: 4,  
            }}
        >
            <Grid2
                className="fadeIn"
                sx={{
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 1.5,
                    width: { xs: '100%', sm: '60%', md: '40%', lg: '30%' }, 
                    maxWidth: 500
                }}
            >
                <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                    {title}
                </Typography>
                {children}
            </Grid2>
        </Grid2>
    );
};
