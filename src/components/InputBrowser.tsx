import { Grid2, TextField, InputAdornment } from "@mui/material";
import SearchRounded from '@mui/icons-material/SearchRounded';
import React from "react";

export const InputBrowser: React.FC = () => {
    return (
        <Grid2 container justifyContent={"center"} sx={{ padding: 1 }}>
            <TextField
                variant="outlined"
                placeholder="Buscar producto..."
                sx={{
                    minWidth: "150px",
                    maxWidth: "400px",
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
