import React, { useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import useDebounce from "../hooks/useDebounce";

const TableFilters = ({ filters, setFilters, data }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const roles = [...new Set(data.map((item) => item.role))];

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <TextField
        label="Search Name"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={() => setFilters((prev) => ({ ...prev, name: debouncedSearch }))}
      />
      <FormControl size="small">
        <InputLabel>Role</InputLabel>
        <Select
          multiple
          value={filters.roles}
          onChange={(e) => setFilters((prev) => ({ ...prev, roles: e.target.value }))}
          renderValue={(selected) => selected.join(", ")}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default TableFilters;
