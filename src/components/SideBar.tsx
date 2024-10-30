import { Box, Divider, Drawer, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { Link as RouterLink } from "react-router-dom";
import { InSideBar } from '../interface';

export const SideBar: React.FC<InSideBar> = ({ drawerWidth = 240, mobileOpen, handleDrawerToggle, listItems }) => {
    const drawerContent = (
        <>
            <Toolbar>
                <Grid2 container width={"100%"} justifyContent={"center"} alignItems={"center"}  padding={2}>
                    <img
                        src="https://www.w3schools.com/howto/img_avatar.png" 
                        alt={"logo HIOSV"}
                        style={{ borderRadius: '5%', width: 90 }}
                    />
                </Grid2>
            </Toolbar>
            <Divider />
            <List>
                {listItems.map((itemNav, index) => (
                    <ListItem key={index} disablePadding >
                        <ListItemButton
                            component={RouterLink}
                            to={itemNav.path}
                            onClick={handleDrawerToggle}
                        >
                            <ListItemIcon>
                                <TurnedInNot />
                            </ListItemIcon>
                            <ListItemText primary={itemNav.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            {/* Drawer en modo permanente para pantallas grandes */}
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Drawer en modo temporal para pantallas pequeñas */}
            <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};
