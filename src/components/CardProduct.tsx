import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export const CardProduct: React.FC = () => {

    const stock: number = 10;

    return (
        <Card sx={{
            maxWidth: { xs: "50%", md: "17%" },
            margin: 1,
        }}>
            <CardMedia
                component={"img"}
                image="https://www.w3schools.com/howto/img_avatar.png"
                height={150}
                sx={{
                    objectFit: "fill",
                    borderRadius: 1,
                    border: "1px solid gray",
                }}
                alt={"Imagen Producto"}
            />
            <CardContent>
                <Typography variant="h6">Titulo del producto</Typography>
                <Typography component={"p"} variant="body2" paddingY={1}>lorem sdasdasdasdasd Lorem ipsum asdasd</Typography>
                <Typography component={"p"} variant="body1"><span style={{fontWeight: "bold"}}>Stock:</span> {stock}</Typography>
            </CardContent>
            <CardActions >
                <Button variant="contained" color="info" >
                    Add
                </Button>
            </CardActions>

        </Card>
    );
};
