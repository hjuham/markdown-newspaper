import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditArticle from "./EditArticle";
import { useState } from "react";

const ArticlesTable = ({ articles }) => {
  const [editing, setEditing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
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
              onClick={(e) => editArticle(e, params.row)}
              variant="contained"
              color="warning"
            >
              Edit
            </Button>
            <span> </span>
            <Button
              onClick={(e) => removeArticle(e, params.row)}
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

  const editArticle = (e, item) => {
    setEditing(true);
    setSelectedArticle(item);
  };

  const removeArticle = (e, item) => {
    console.log(item);
  };

  return (
    <div style={{ minHeight: 400, width: "100%" }}>
      {editing ? (
        <EditArticle article={selectedArticle} setEditing={setEditing} />
      ) : (
        <DataGrid
          getRowId={getRowId}
          rows={articles}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      )}
    </div>
  );
};
export default ArticlesTable;
