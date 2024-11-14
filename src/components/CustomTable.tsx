import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Typography, Box, Grid2, Checkbox } from '@mui/material';
import Delete from '@mui/icons-material/Delete';

import DriveFileRenameOutline from '@mui/icons-material/DriveFileRenameOutline';
import { CustomTableProps } from '../interface';

export const CustomTable: React.FC<CustomTableProps> = ({ columns, rows, actions = [] }) => {
 
  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5', height: '40px' }}>
              {columns.map((column) => (
                <TableCell key={column.field} sx={{ fontWeight: 'bold', color: '#555', padding: '8px' }}>
                  <Typography variant="body1">{column.headerName}</Typography>
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell sx={{ fontWeight: 'bold', color: '#555', padding: '8px' }}>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' }, height: '40px' }}>
                {columns.map((column) => (
                  <TableCell key={column.field} sx={{ padding: '4px 8px' }}>
                    {row[column.field]}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell sx={{ padding: '4px 8px' }}>
                    <Box display="flex" gap={1}>
                      {actions.map((action, index) => (
                        <IconButton
                          key={index} 
                          onClick={() => action.onClick(row)}
                          color={action.label === 'Delete' ? 'error' : 'primary'}
                          size="small"
                        >
                          {action.label === 'Delete' ? <Delete /> : <DriveFileRenameOutline />}
                        </IconButton>
                      ))}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
