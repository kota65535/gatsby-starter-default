import React, { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { DialogCloseButton } from '@/components/common';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Field } from '@/components/resources';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { theme } from '@/styles/theme';

type Props<R extends FieldValues> = {
  fields: Field<R>[];
  resource?: R;
  title: string;
  onClose: () => void;
  onEdit: (data: R) => void;
};
export const ResourceEditDialog = <R extends FieldValues>(props: Props<R>) => {
  const [editing, setEditing] = React.useState<{ [key: string]: boolean }>(
    props.fields.reduce((a, v) => ({ ...a, [v.name]: false }), {})
  );

  const schema = yup.object(props.fields.reduce((a, v) => ({ ...a, [v.name]: v.schema.label(v.label) }), {}));

  const form = useForm<R>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.resource as DefaultValues<R>
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = form;

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogCloseButton onClose={props.onClose} />
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent sx={{ pb: 6 }}>
        <TableContainer>
          <Table>
            <TableBody>
              {props.fields.map((f, i) => {
                const rawValue = props.resource?.[f.name];
                let value: any;
                if (rawValue == null) {
                  value = '';
                } else {
                  if (f.valueGetter) {
                    value = f.valueGetter(rawValue);
                  } else {
                    value = rawValue.toString();
                  }
                }
                const onEditStart = () => {
                  setEditing({ ...editing, [f.name]: true });
                };
                const onEditOK = async () => {
                  console.log(form.getValues());
                  await props.onEdit(form.getValues());
                  setEditing({ ...editing, [f.name]: false });
                };
                const onEditCancel = () => {
                  setEditing({ ...editing, [f.name]: false });
                };
                return (
                  <TableRow key={i}>
                    <TableCell>{f.label}</TableCell>
                    <TableCell sx={{ width: 300 }}>{editing[f.name] ? f.component(f, form) : value}</TableCell>
                    <TableCell sx={{ width: 120 }}>
                      <Box display="flex" justifyContent="center">
                        {editing[f.name] ? (
                          isSubmitting ? (
                            <CircularProgress sx={{ color: theme.palette.grey['500'] }} size={24} />
                          ) : (
                            [
                              <IconButton color="primary" disabled={!isValid} onClick={handleSubmit(onEditOK)}>
                                <SaveIcon />
                              </IconButton>,
                              <IconButton color="primary" onClick={onEditCancel}>
                                <CancelIcon />
                              </IconButton>
                            ]
                          )
                        ) : (
                          <IconButton color="primary" onClick={onEditStart}>
                            <EditIcon />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};
