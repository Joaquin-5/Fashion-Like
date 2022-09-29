import React, { useState } from "react";
import { Box, Button, Typography, Modal, Divider } from "@mui/material";
import { FormPost } from "../form/FormPost";
import AddIcon from "@mui/icons-material/Add";
import { CancelButton } from "../buttons/CancelButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  maxHeight: '90vh',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

export const ModalComponent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button startIcon={<AddIcon />} color="inherit" onClick={handleOpen}>
        Nuevo Posteo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        sx={{
          "& > div": {
            border: "none",
            boxShadow: "0 0 10px -2px #000",
          },
        }}
      >
        <Box sx={style}>
          <CancelButton
            onClick={handleClose}
            style={{
              top: "-17px",
              right: "-17px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "11px 14px",
            }}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
            Crear una nueva publicación
          </Typography>

          <Divider sx={{ mt: 1, mb: 3 }} />
          <FormPost editProp handleModalProp={handleClose} />
        </Box>
      </Modal>
    </>
  );
};
