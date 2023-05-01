import React from 'react';
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@mui/material';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FieldByType } from '@/components/types';

interface Props<R extends FieldValues> {
  form: UseFormReturn<R>;
  name: FieldByType<R, string>;
  label: string;
  choices: Path<R['name']>[];
}

export const RadioSelect = <R extends FieldValues>(props: Props<R>) => {
  const { control } = props.form;
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, fieldState }) => {
        const value = field.value || '';
        return (
          <FormControl fullWidth error={fieldState.invalid}>
            <RadioGroup value={value}>
              {props.choices.map((c) => (
                <FormControlLabel key={c} {...field} value={c} control={<Radio />} label={c} />
              ))}
            </RadioGroup>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
