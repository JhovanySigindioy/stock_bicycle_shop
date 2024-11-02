import { Grid2, TextField, InputAdornment } from "@mui/material";
import SearchRounded from '@mui/icons-material/SearchRounded';
import React, { ChangeEvent } from "react";

interface InInputBrowserProps {
    textValue: string;
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }

export const InputBrowser: React.FC<InInputBrowserProps> = ({textValue, handleOnChange}) => {
    return (
        <Grid2 container justifyContent={"center"} sx={{ padding: 2 }}>
            <TextField
                value={textValue}
                onChange={handleOnChange}
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
