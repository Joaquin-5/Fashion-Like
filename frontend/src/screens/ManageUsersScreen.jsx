import React, { useEffect } from "react";
import { IconButton, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fashionApiWithToken } from "../api/fashionApi";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, deleteUser, setUsers } from "../store/users/usersSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export const ManageUsersScreen = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const selectOnChange = async (id, value) => {
    const res = await fashionApiWithToken.patch("/users/" + id, {
      role: value,
    });
    dispatch(changeRole(res.data.user));
  };

  const handleUserDelete = (id) => {
    console.log("delete user: " + id);
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "No hay manera de recuperar al usuario!, ¿Esta seguro de eliminarlo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Elimínalo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fashionApiWithToken.delete("/users/" + id);
          dispatch(deleteUser(id));
          Swal.fire("Eliminado!", "El usuario fue eliminado ", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Error!", "No se pudo eliminar el usuario", "error");
        }
      }
    });
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
      sortable: false,
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
    {
      headerName: "Acciones",
      field: "actions",
      sortable: false,
      minWidth: 70,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={() => handleUserDelete(params.id)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    console.log("HOla");
    fashionApiWithToken.get("/users").then((res) => {
      dispatch(setUsers(res.data.users));
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
      // Texto de la tabla en español
      localeText={{
        noRowsLabel: "No hay usuarios",
        toolbarDensity: "Tamaño",
        toolbarDensityLabel: "Tamaño",
        toolbarDensityCompact: "Compacto",
        toolbarDensityStandard: "Estándar",
        toolbarDensityComfortable: "Grande",
        actionsCellMore: "Más",
        actionsColumnIndex: "Acciones",
        toolbarFilters: "Filtros",
        toolbarFiltersLabel: "Mostrar filtros",
        toolbarFiltersTooltipHide: "Ocultar filtros",
        toolbarFiltersTooltipShow: "Mostrar filtros",
        toolbarFiltersTooltipActive: (count) =>
          count !== 1 ? `${count} filtros activos` : `${count} filtro activo`,
        filterPanelAddFilter: "Añadir filtro",
        filterPanelDeleteIconLabel: "Eliminar",
        filterPanelOperators: "Operadores",
        filterPanelOperatorAnd: "Y",
        filterPanelOperatorOr: "O",
        filterPanelColumns: "Columnas",
        filterPanelInputLabel: "Valor",
        filterPanelInputPlaceholder: "Valor del filtro",
        columnMenuLabel: "Menú",
        columnMenuShowColumns: "Mostrar columnas",
        columnMenuFilter: "Filtrar",
        columnMenuHideColumn: "Ocultar",
        columnMenuUnsort: "Desordenar",
        columnMenuSortAsc: "Ordenar ascendente",
        columnMenuSortDesc: "Ordenar descendente",
        columnHeaderFiltersTooltipActive: (count) =>
          count !== 1 ? `${count} filtros activos` : `${count} filtro activo`,
        columnHeaderFiltersLabel: "Mostrar filtros",
        columnHeaderSortIconLabel: "Ordenar",
        footerTotalItems: "Total:",
        paginationRange: (from, to, count) => `${from}-${to} de ${count}`,
        paginationRowsPerPage: "Filas por página:",
      }}
    />
  );
};
