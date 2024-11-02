import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { ModalLayoutProps } from "../interface";

export const ModalLayout: React.FC<ModalLayoutProps> = ({ title, cartOpen, handleCartClose, children }) => {
    return (
        <Dialog open={cartOpen} onClose={handleCartClose} fullWidth>
            <IconButton
                onClick={handleCartClose}
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderRadius: "2px",
                    backgroundColor: "red",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "darkred",
                    },
                }}
            >
                <CloseOutlined />
            </IconButton>
            <DialogTitle sx={{ paddingLeft: 3 }}>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
};
