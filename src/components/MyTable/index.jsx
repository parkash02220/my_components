import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  TablePagination,
} from "@mui/material";
import TableCellRenderer from "./TableCellRenderer";
import Loader from "../Loader/Loader";
import useResponsiveValue from "@/hooks/common/useResponsiveValue";

const MyTable = ({
  columns,
  rows,
  fetchMore,
  totalCount,
  isLoading = true,
  emptyTableMsg,
  isAllRowSelected,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fontSize = useResponsiveValue("fontSize");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchMore({ page: newPage + 1, limit: rowsPerPage });
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
    fetchMore({ page: 1, limit: newLimit });
  };
  const isTableEmpty = !isLoading && rows?.length === 0;
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table
          size="small"
          sx={{
            borderCollapse: "collapse",
            borderSpacing: 0,
            minWidth: { xs: 750, sm: 960 },
            minHeight: isTableEmpty || isLoading ? 300 : "auto",
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((col) => {
                return (
                  <TableCell
                    key={col.id}
                    align={col.align || "left"}
                    sx={{
                      borderColor: "transparent",
                      fontSize: { xs: 12, sm: 13, lg: 14 },
                      color: "#637381",
                      fontWeight: 600,
                      background: "#F4F6F8",
                      padding: "16px",
                    }}
                  >
                    {col.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Loader />
                </TableCell>
              </TableRow>
            ) : isTableEmpty ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 4, fontStyle: "italic", color: "#637381" }}
                >
                  {emptyTableMsg || "No data found"}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  sx={{ "&:hover": { background: "#F4F6F8" } }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.align || "left"}
                      sx={{
                        p:
                          col.type === "checkbox" || col.type?.includes("icon")
                            ? 1
                            : 2,
                        width:
                          col.type === "checkbox" || col.type?.includes("icon")
                            ? "1%"
                            : "auto",
                        whiteSpace: "nowrap",
                        ...(col.sx || {}),
                      }}
                    >
                      <TableCellRenderer
                        type={col.type}
                        isAllRowSelected={isAllRowSelected}
                        value={row[col.id]}
                        onChange={(e) => col.onChange?.(e, row)}
                        onClick={(e) => col.onClick?.(e, row)}
                        tooltip={col.tooltip}
                        icon={col.icon}
                        icons={
                          col.type === "multipleIconButton"
                            ? col.icons?.map((iconObj) => ({
                                ...iconObj,
                                onClick: (e) => iconObj.onClick?.(e, row),
                              }))
                            : undefined
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{
          p: "8px !important",
          "& .MuiTablePagination-toolbar": {
            minHeight: "40px",
            fontSize: fontSize,
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: fontSize,
            },
          "& .MuiInputBase-root": {
            fontSize: fontSize,
          },
          "& .MuiTablePagination-actions .MuiSvgIcon-root": {
            fontSize: {
              xs: "18px",
              sm: "20px",
              md: "22px",
            },
          },
        }}
      />
    </Paper>
  );
};

export default MyTable;
