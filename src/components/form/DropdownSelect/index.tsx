import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface Props<R extends FieldValues> {
  form: UseFormReturn<R>;
  name: Path<R>;
  label: string;
  choices: string[];
}

export const DropDownSelect = <R extends FieldValues>(props: Props<R>) => {
  const { control } = props.form;
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, fieldState }) => {
        const value = field.value || '';
        return (
          <FormControl fullWidth error={fieldState.invalid}>
            <InputLabel id={props.name}>{props.label}</InputLabel>
            <MuiSelect labelId={props.name} label={props.label} autoWidth {...field} value={value}>
              {props.choices.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </MuiSelect>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
