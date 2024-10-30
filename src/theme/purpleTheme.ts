import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme: Theme = createTheme({
    palette: {
        primary: {
            main: "#262254",
        },
        secondary: {
            main: "#543388",
        },
        error: {
            main: red.A400,
        }
    }
});