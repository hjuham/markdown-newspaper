import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditUser from "./EditUser";

const UsersTable = ({ users }) => {
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
              onClick={(e) => removeUser(e, params.row)}
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
    console.log(item);
  };

  const removeUser = (e, item) => {
    console.log(item);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={getRowId}
        rows={users}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
      />
    </div>
  );
};
export default UsersTable;
