import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditUser from "./EditUser";
import { useState } from "react";
import { deleteUser } from "../../services/userRequests";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const UsersTable = ({ users }) => {
  const [editing, setEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState("");

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
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 250 },
    {
      field: " ",
      headerName: " ",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={(e) => editUser(e, params.row)}
              variant="contained"
              color="warning"
            >
              Edit
            </Button>
            <span> </span>
            <Button
              onClick={(e) => confirmRemoveUser(e, params.row)}
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

  const editUser = (e, item) => {
    setEditing(true);
    setSelectedUser(item);
  };

  const confirmRemoveUser = (e, item) => {
    setModalId(item._id);
    setOpenModal(true);
  };

  const removeUser = async (id) => {
    setLoading(true);
    await deleteUser(id, setError, setLoading);
    window.location.reload();
  };

  return (
    // <div style={{ height: 400, width: "100%" }}>
    //   <DataGrid
    //     getRowId={getRowId}
    //     rows={users}
    //     columns={columns}
    //     pageSize={5}
    //     disableRowSelectionOnClick
    //   />
    // </div>
    <div style={{ minHeight: 400, width: "100%" }}>
      {editing ? (
        <EditUser user={selectedUser} setEditing={setEditing} />
      ) : (
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
                Are you sure you want to delete the user?
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeUser(modalId)}
                disabled={loading}
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
            rows={users}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
          />
        </>
      )}
    </div>
  );
};
export default UsersTable;
