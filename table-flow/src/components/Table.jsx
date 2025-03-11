import React, { useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Chip, Avatar, Typography } from "@mui/material";
import TableFilters from "./TableFilters";
import schema from "../config/tableSchema.json";
import dataJson from "../config/tableData.json";

const Table = () => {
  const [filters, setFilters] = useState({ name: "", roles: [] });

  // Define columns while removing the extra "Avatar" column
  const columns = schema.columns
  .filter((col) => col.accessorKey !== "image" && col.accessorKey !== "age") 
  .map((col) => {

      if (col.accessorKey === "name") {
        return {
          ...col,
          Cell: ({ row }) => (
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar 
                src={row.original.image} 
                alt={row.original.name} 
                sx={{ width: 36, height: 36, border: "2px solid #ccc" }} 
              />
              <Box>
                <Typography fontWeight="bold">{row.original.name}</Typography>
                <Typography variant="body2" color="gray">@{row.original.username}</Typography>
              </Box>
            </Box>
          ),
        };
      }

      if (col.accessorKey === "status") {
        return {
          ...col,
          Cell: ({ cell }) => (
            <Chip label={cell.getValue()} size="small" color="primary" sx={{ fontWeight: "bold" }} />
          ),
        };
      }

      if (col.accessorKey === "teams") {
        return {
          ...col,
          Cell: ({ cell }) => {
            const teams = cell.getValue();
            const visibleTeams = teams.slice(0, 3);
            const extraCount = parseInt(teams[teams.length - 1].replace("+", ""), 10); 
      
            return (
              <Box sx={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                {visibleTeams.map((team, idx) => (
                  <Chip key={idx} label={team} size="small" color="primary" />
                ))}
                {extraCount > 0 && <Chip label={`+${extraCount}`} size="small" />}
              </Box>
            );
          },
        };
      }
      
      return col;
    });

  // Filter data based on search inputs
  const filteredData = useMemo(() => {
    return dataJson.data.filter((row) => {
      return (
        row.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.roles.length === 0 || filters.roles.includes(row.role))
      );
    });
  }, [filters]);

  return (
    <div>
      <TableFilters filters={filters} setFilters={setFilters} data={dataJson.data} />
      <MaterialReactTable
        columns={columns}
        data={filteredData}
        enableSorting
        enablePagination
        enableColumnFilters
        enableRowSelection
        muiTableBodyRowProps={{ hover: true }}
      />
    </div>
  );
};

export default Table;
