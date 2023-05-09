import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import * as yup from 'yup';
import { DefaultValues, FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { DialogCloseButton } from '@/components/common';
import { Field } from '@/components/resources';

interface Props<R extends FieldValues> {
  fields: Field<R>[];
  resource?: R;
  title: string;
  onOK: (data: R) => void;
  onCancel: () => void;
}

export const EditableResourceDialog = <R extends FieldValues>(props: Props<R>) => {
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

  const onOK = async (data: R) => {
    console.log(data);
    console.log(form.getValues());
    await props.onOK(form.getValues());
  };

  return (
    <Dialog open={true} onClose={props.onCancel}>
      <DialogCloseButton onClose={props.onCancel} />
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              {props.fields.map((f, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{f.label}</TableCell>
                    <TableCell>{f.component(f, form)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.onCancel} disabled={isSubmitting} sx={{ width: 90 }}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(onOK)}
          disabled={!isValid}
          loading={isSubmitting}
          sx={{ width: 90 }}
        >
          OK
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
