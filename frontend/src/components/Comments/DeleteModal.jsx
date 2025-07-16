import { Modal, Typography, Box, Button } from "@mui/material";

const modalStyle = {
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

const DeleteModal = ({ open, onClose, onConfirm, loading }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete the comment?
        </Typography>
        <Button
          disabled={loading}
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Delete
        </Button>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
