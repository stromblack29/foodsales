import { Modal, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

interface ModalProps {
    open: boolean,
    handleClose: VoidFunction,
    children: React.ReactNode
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pt: 2,
    px: 4,
    pb: 3,
  };

export function CustomModal (props: ModalProps) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(props.open);
    }, [props.open])
    const handleClose = () => {
        props.handleClose();
    }
    return (
        <React.Fragment>
            <Modal open={props.open} onClose={() => { handleClose() }} sx={{ 
                    border: '0px solid',
                    '& .MuiBox-root': {
                        outline: 'none'
                    } 
                }}>
                <Box sx={{ ...style }}>
                    {props.children}
                </Box>
            </Modal>
        </React.Fragment>
    )
}