import { Box, Grid2 } from "@mui/material";
import React, { ReactNode } from "react";
import { NavBar, SideBar } from ".";
import { InListItemsSidebar } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logout, toggleSideBar } from "../store/slice";

const drawerWidth: number = 240;// Se define el ancho del SIDEBAR

export const DashboardLayout: React.FC<{ children: ReactNode, listItemsSidebar: InListItemsSidebar[] }> = ({ children, listItemsSidebar }) => {

    const { isMobilOpen } = useSelector((state: RootState) => state.sidebar);
    const dispatch = useDispatch();

    const handleDrawerToggle = () => {
        dispatch(toggleSideBar());
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <Box
            className="fadeIn"
            sx={{ display: "flex" }}>
            <NavBar drawerWidth={drawerWidth} handleMenuClick={handleDrawerToggle} handleLogout={handleLogout} />
            <SideBar drawerWidth={drawerWidth} mobileOpen={isMobilOpen} handleDrawerToggle={handleDrawerToggle} listItems={listItemsSidebar} />
            <Grid2
                sx={{
                    width: "100%",
                    marginTop: "64px",
                    paddingX: "15px",
                    paddingBottom: "15px"
                }}
            >
                {children}
            </Grid2>
        </Box>
    );
};
