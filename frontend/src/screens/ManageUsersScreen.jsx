import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fashionApiWithToken } from "../api/fashionApi";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, setUsers } from "../store/users/usersSlice";

export const ManageUsersScreen = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const selectOnChange = async (id, value) => {
    const res = await fashionApiWithToken.patch("/users/" + id, {
      role: value,
    });
    dispatch(changeRole(res.data.user))
  };

  const columns = [
    { field: "index", headerName: "ID", width: 150 },
    {
      field: "username",
      headerName: "Nombre de usuario",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      sortable: false
    },
    {
      field: "role",
      headerName: "Rol",
      sortable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={params.value}
            label="Age"
            sx={{ width: "100%" }}
            onChange={(e) => selectOnChange(params.id, e.target.value)}
          >
            <MenuItem value={"ROLE_ADMIN"}>Administrador</MenuItem>
            <MenuItem value={"ROLE_USER"}>Usuario</MenuItem>
          </Select>
        );
      },
    },
  ];

  useEffect(() => {
    console.log("HOla");
    fashionApiWithToken.get("/users").then((res) => {
      dispatch(
        setUsers(
          res.data.users
        )
      );
      // Quitar usuario logeado
    });
  }, []);

  return (
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        disableColumnSelector
        autoHeight
      />
  );
};
