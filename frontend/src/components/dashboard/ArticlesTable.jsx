import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useState } from "react";
import { deleteArticle } from "../../services/articleRequests";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const ArticlesTable = ({ articles }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState("");

  const navigate = useNavigate();

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

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 400 },
    { field: "author", headerName: "Author", width: 150 },
    {
      field: " ",
      headerName: " ",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => navigate(`/edit-article/${params.id}`)}
              variant="contained"
              color="warning"
            >
              Edit
            </Button>
            <span> </span>
            <Button
              onClick={(e) => confirmRemoveArticle(e, params.row)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  function getRowId(row) {
    return row._id;
  }

  const confirmRemoveArticle = (e, item) => {
    setModalId(item._id);
    setOpenModal(true);
  };

  const removeArticle = async (id) => {
    setLoading(true);
    await deleteArticle(id, setError, setLoading);
    window.location.reload();
  };

  return (
    <div style={{ minHeight: 400, width: "100%" }}>
      <>
        {loading}
        {error}
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete the article?
            </Typography>
            <Button
              disabled={loading}
              variant="contained"
              color="error"
              onClick={() => removeArticle(modalId)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="#4dabf5"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
        <DataGrid
          getRowId={getRowId}
          rows={articles}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </>
    </div>
  );
};
export default ArticlesTable;
