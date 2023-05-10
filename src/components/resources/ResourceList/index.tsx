import { DataGrid, GridActionsCellItem, GridColDef, GridToolbarContainer, GridValidRowModel } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from 'react';
import { Button, css, IconButton } from '@mui/material';
import { FieldValues } from 'react-hook-form';

const dataGridStyle = css`
  .MuiDataGrid-row {
    cursor: pointer;
  }
  .MuiDataGrid-cell:focus {
    outline: none;
  }
  .MuiDataGrid-cell:focus-within {
    outline: none;
  }
`;

interface Field<R extends FieldValues> extends Omit<GridColDef<R>, 'field' | 'headerName'> {
  name: Extract<keyof R, string>;
  label: string;
}

interface Props<R extends FieldValues> {
  fields: Field<R>[];
  resources: R[];
  onCreate?: () => void;
  onClick: (resource: R) => void;
  onEdit?: (resource: R) => void;
  onDelete?: (resource: R) => void;
  onRefresh?: () => void;
  loading?: boolean;
}

export const ResourceList = <R extends GridValidRowModel>(props: Props<R>) => {
  const columns: GridColDef<R>[] = props.fields.map((f) => {
    return {
      field: f.name,
      headerName: f.label,
      valueGetter: f.valueGetter ? (params) => f.valueGetter?.(params.row[f.name]) : undefined
    };
  });
  const onCreateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onCreate?.();
  };
  const onEditClick = (resource: R) => (e: React.MouseEvent) => {
    e.preventDefault();
    props.onEdit?.(resource);
  };
  const onDeleteClick = (resource: R) => (e: React.MouseEvent) => {
    e.preventDefault();
    props.onDelete?.(resource);
  };
  const onRefreshClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onRefresh?.();
  };

  if (props.onEdit || props.onDelete) {
    columns.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => {
        const ret = [];
        if (props.onEdit) {
          ret.push(
            <GridActionsCellItem
              key={`${params.id}-edit`}
              icon={<EditIcon />}
              label="Edit"
              onClick={onEditClick(params.row)}
              color="primary"
            />
          );
        }
        if (props.onDelete) {
          ret.push(
            <GridActionsCellItem
              key={`${params.id}-delete`}
              icon={<DeleteIcon />}
              label="Delete"
              onClick={onDeleteClick(params.row)}
              color="primary"
            />
          );
        }
        return ret;
      }
    });
  }

  return (
    <DataGrid
      autoHeight
      rows={props.resources}
      columns={columns}
      disableRowSelectionOnClick
      onRowClick={(params) => {
        props.onClick(params.row);
      }}
      slots={{
        toolbar: () => (
          <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
            {props.onCreate && (
              <Button color="primary" startIcon={<AddIcon />} onClick={onCreateClick}>
                New
              </Button>
            )}
            {props.onRefresh && (
              <IconButton color="primary" onClick={onRefreshClick}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            )}
          </GridToolbarContainer>
        )
      }}
      loading={props.loading}
      css={dataGridStyle}
    ></DataGrid>
  );
};
