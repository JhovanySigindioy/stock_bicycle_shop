import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export const CardProduct: React.FC<{ title: string }> = ({ title }) => {

    const stock: number = 10;

    return (
        <Card className="fadeIn" sx={{
            display: "flex",
            maxWidth: { xs: "100%", md: "48%", lg: "32%" },
            maxHeight: "195px",
            transition: "0.2s",
            "&:hover": {
                transform: "scale(1.05)",
            }
        }}>
            <CardMedia
                component={"img"}
                image="https://www.w3schools.com/howto/img_avatar.png"
                sx={{
                    width: { xs: 130, md: 140, lg: 170 },
                    objectFit: "fill",
                }}
                alt={"Imagen Producto"}
            />
            <CardContent sx={{ fontSize: "15px", padding: "10px", "& .MuiTypography-root": { fontSize: "inherit" }, display: "flex", flexDirection: "column" }}>
                <Box>
                    <Typography variant="h6">{title}</Typography>
                    <Typography component="p" variant="body2" paddingY={1}>
                        lorem sdasdasdasdasd Lorem ipsum asdasd
                    </Typography>
                    <Typography component="p" variant="body1">
                        <span style={{ fontWeight: "bold" }}>Stock:</span> {stock}
                    </Typography>
                </Box>
                <CardActions sx={{ paddingTop: 3, }}>
                    <Button variant="contained" fullWidth>asd</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};
