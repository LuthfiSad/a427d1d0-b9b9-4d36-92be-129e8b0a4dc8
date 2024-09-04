import { InputAdornment, TextField } from "@mui/material";
import { MdSearch } from "react-icons/md";

import React from "react";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MdSearch className="text-xl" />
          </InputAdornment>
        ),
        style: {
          borderRadius: "25px",
          paddingLeft: "10px",
        },
      }}
      sx={{
        "& .MuiInputBase-input": {
          paddingBlock: "10px",
        },
      }}
    />
  );
};

export default SearchInput;
