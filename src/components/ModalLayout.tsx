import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { ModalLayoutProps } from "../interface";

export const ModalLayout: React.FC<ModalLayoutProps> = ({ title, modalOpen, handleModalClose, children }) => {
    const [scaleIn, setScaleIn] = useState(false);

    useEffect(() => {
        if (modalOpen) {
            setScaleIn(true);
        } else {
            setScaleIn(false);
        }
    }, [modalOpen]);

    return (
        <Dialog
            open={modalOpen}
            onClose={handleModalClose}
            fullWidth
            sx={{
                margin: 0,
                padding: 0,
                "& .MuiPaper-root": {
                    transform: scaleIn ? "scale(1)" : "scale(0.1)",
                    transition: "transform 0.3s ease-in-out",
                },
            }}
        >
            <IconButton
                onClick={handleModalClose}
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
            <DialogContent sx={{ margin: 0, padding: 0 }}>
                {children}
            </DialogContent>
        </Dialog>
    );
};
