import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material';
import { Controller, Path, FieldValues, UseFormReturn } from 'react-hook-form';

interface Props<R extends FieldValues> {
  form: UseFormReturn<R>;
  name: Path<R>;
  label: string;
  choices: Path<R['name']>[];
}

export const toBooleanMap = <M extends string>(allValues: { [s: string]: M }, values: M[]): { [P in M]: boolean } => {
  return Object.values(allValues).reduce(
    (a, v) => ({ ...a, [v]: values.includes(v) }),
    {} as { [keyof in M]: boolean }
  );
};

export const fromBooleanMap = <M,>(booleanMap: Record<keyof M, boolean>): Array<keyof M> => {
  const entries = Object.entries(booleanMap) as [keyof M, boolean][];
  return entries.filter(([, v]) => v).map(([k]) => k);
};

export const CheckboxSelect = <R extends FieldValues>(props: Props<R>) => {
  const {
    control,
    trigger,
    formState: { errors }
  } = props.form;
  const errorText = errors[props.name]?.message as string;
  return (
    <>
      <FormControl fullWidth error={props.name in errors}>
        {props.choices.map((c) => {
          return (
            <Controller
              key={c}
              control={control}
              name={`${props.name}.${c}` as Path<R>}
              render={({ field }) => {
                const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e);
                  await trigger(props.name);
                };
                const value = field.value || false;
                return (
                  <FormControlLabel
                    label={c}
                    control={<Checkbox {...field} onChange={onChange} value={value} checked={value} />}
                  />
                );
              }}
            />
          );
        })}
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    </>
  );
};
