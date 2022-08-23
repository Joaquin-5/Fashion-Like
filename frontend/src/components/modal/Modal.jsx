import React, { useState } from "react";
import { Box, Button, Typography, Modal, Divider } from "@mui/material";
import { FormPost } from "../form/FormPost";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalComponent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        sx={{ "& > div": { border: "none", borderRadius: "10px", boxShadow: "0 0 10px -2px #000" } }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Crear una nueva publicación
          </Typography>

          <Divider sx={{ mt: 1, mb: 3 }} />
          <FormPost editProp handleModalProp={handleClose}/>
        </Box>
      </Modal>
    </>
  );
};