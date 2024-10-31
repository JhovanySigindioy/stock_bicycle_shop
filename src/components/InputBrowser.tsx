import { Grid2, TextField, InputAdornment } from "@mui/material";
import SearchRounded from '@mui/icons-material/SearchRounded';
import React from "react";

export const InputBrowser: React.FC = () => {
    return (
        <Grid2 container justifyContent={"center"} sx={{ padding: 2 }}>
            <TextField
                variant="outlined"
                placeholder="Buscar producto..."
                sx={{
                    backgroundColor: "white",
                    borderRadius: 2,
                    minWidth: "150px",
                    maxWidth: "400px",
                    zIndex: 1,
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRounded />
                            </InputAdornment>
                        ),
                        style: {
                            height: '42px',
                        },
                    },
                }}
            />
        </Grid2>
    );
};
