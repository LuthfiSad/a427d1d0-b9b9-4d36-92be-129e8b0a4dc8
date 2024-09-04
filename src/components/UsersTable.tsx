import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UserInputGroup from "./UserInputGroup";

const paginationModel = { pageSize: 5, page: 0 };

interface UsersTableProps {
  control: any;
  filteredUsers: User[];
  errors: {
    [key: number]: { [key in keyof User]?: any };
  };
  changedFields: {
    [key: number]: { [key in keyof User]?: boolean };
  };
  handleFieldChange: (
    index: number,
    field: keyof User,
    newValue: string
  ) => void;
  onSubmit: () => void;
  currentState: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({
  filteredUsers,
  handleFieldChange,
  control,
  errors,
  changedFields,
  onSubmit,
  currentState,
}) => {
  const columnConfig: Array<{ field: keyof User; headerName: string }> = [
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "position", headerName: "Position" },
    { field: "phone", headerName: "Phone" },
    { field: "email", headerName: "Email" },
  ];

  const columns = columnConfig.map(({ field, headerName }) => ({
    field,
    headerName,
    flex: 1,
    renderCell: (params: any) => (
      <UserInputGroup
        control={control}
        index={params.row.index}
        field={field}
        error={errors[params.row.index]}
        changedFields={changedFields}
        onSubmit={onSubmit}
        currentState={currentState}
        handleFieldChange={handleFieldChange}
      />
    ),
  }));

  return (
    <DataGrid
      rows={filteredUsers.map((row, index) => ({
        ...row,
        id: row.id,
        index,
      }))}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      autoHeight
      disableColumnMenu
      getRowHeight={() => "auto"}
      sx={{
        "& .MuiDataGrid-main": {
          padding: 0,
        },
        "& .MuiDataGrid-cell": {
          padding: 0,
        },
        "& .MuiDataGrid-columnHeaderTitleContainer": {
          justifyContent: "space-between",
        },
      }}
    />
  );
};

export default UsersTable;
