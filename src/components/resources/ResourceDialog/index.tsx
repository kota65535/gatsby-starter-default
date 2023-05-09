import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { DialogCloseButton } from '@/components/common';
import { Field } from '@/components/resources';

interface Props<R extends FieldValues> {
  fields: Field<R>[];
  resource?: R;
  title: string;
  onClose: () => void;
}

export const ResourceDialog = <R extends FieldValues>(props: Props<R>) => {
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
                let value;
                if (rawValue == null) {
                  value = '';
                } else {
                  if (f.valueGetter) {
                    value = f.valueGetter(rawValue);
                  } else {
                    value = rawValue.toString();
                  }
                }
                return (
                  <TableRow key={i}>
                    <TableCell>{f.label}</TableCell>
                    <TableCell>{value}</TableCell>
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
