import { AppBar, Grid2, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { InNavBar } from '../interface';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const NavBar: React.FC<InNavBar> = ({ drawerWidth = 240, handleMenuClick, handleLogout }) => {
    const { nameUser } = useSelector((state: RootState) => state.auth.dataUser);

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    onClick={handleMenuClick}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>
                <Grid2 container width={"100%"} justifyContent={"space-between"} alignItems={"center"} >
                    <Typography variant='h6' noWrap component='div'> HIOSV </Typography>
                    <Grid2 container direction={"row"} justifyContent={"center"} alignItems={"center"}>
                        <Typography noWrap component='div'
                            sx={{
                                fontSize: {
                                    xs: "12px",  
                                    md: "18px",   
                                }
                            }}
                        >{nameUser}</Typography>
                        <IconButton color='error' onClick={handleLogout}>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid2>
                </Grid2>
            </Toolbar>
        </AppBar>
    )
}
