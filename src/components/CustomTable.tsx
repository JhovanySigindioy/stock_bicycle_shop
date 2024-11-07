import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';
import { CustomTableProps } from '../interface';

export const CustomTable: React.FC<CustomTableProps> = ({ columns, rows, actions = [] }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ fontWeight: 'bold' }}>
                <Typography variant="body1">{column.headerName}</Typography>
              </TableCell>
            ))}
            {actions.length > 0 && <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#f1f1f1' }}}>
              {columns.map((column) => (
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell>
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => action.onClick(row.id)}
                      sx={{ margin: 0.5 }} // Espacio entre botones
                    >
                      {action.label}
                    </Button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
