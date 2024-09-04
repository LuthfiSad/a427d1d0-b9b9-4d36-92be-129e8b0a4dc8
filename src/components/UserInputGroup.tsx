import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import CustomTooltip from "./CostumTooltip";

interface UserInputGroupProps {
  control: any;
  index: number;
  field: keyof User;
  error: {
    [key: number]: { [key in keyof User]?: { message: string } };
  };
  changedFields: {
    [key: number]: { [key in keyof User]?: boolean };
  };
  currentState: User[];
  onSubmit: () => void;
  handleFieldChange: (
    index: number,
    field: keyof User,
    newValue: string
  ) => void;
}

const UserInputGroup: React.FC<UserInputGroupProps> = ({
  control,
  index,
  field,
  error,
  changedFields,
  onSubmit,
  handleFieldChange,
}) => {
  const getCellColor = (field: keyof User) => {
    const isError = !!error?.[index]?.[field];
    const isChanged = changedFields[index]?.[field];

    if (isError) return "rgba(255, 0, 0, 0.2)";
    if (isChanged) return "rgba(0, 255, 0, 0.2)";
    return "white";
  };

  const getInputColor = (field: keyof User) => {
    const isError = !!error?.[index]?.[field];
    const isChanged = changedFields[index]?.[field];

    if (isError) return "error";
    if (isChanged) return "success";
    return;
  };

  return (
    <Controller
      name={`users.${index}.${field}`}
      control={control}
      render={({ field: controllerField }) => (
        <CustomTooltip
          arrow
          placement="bottom-start"
          title={error?.[index]?.[field]?.message || ""}
        >
          <TextField
            variant="standard"
            {...controllerField}
            // value={currentState[index]?.[field] || ""}
            fullWidth
            color={getInputColor(field)}
            onChange={(e) => {
              handleFieldChange(index, field, e.target.value);
              controllerField.onChange(e);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") onSubmit();
            }}
            sx={{
              bgcolor: getCellColor(field),
            }}
            InputProps={{
              style: {
                padding: 15,
              },
            }}
          />
        </CustomTooltip>
      )}
    />
  );
};

export default UserInputGroup;
