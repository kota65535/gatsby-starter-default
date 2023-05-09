import React from 'react';
import { Box, Button } from '@mui/material';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FieldByType } from '../../types';
import { FileCard } from '@/components/common';
import _ from 'lodash';

interface Props<R extends FieldValues> {
  form: UseFormReturn<R>;
  name: FieldByType<R, File[]>;
}

export const FileSelect = <R extends FieldValues>(props: Props<R>) => {
  const { watch, getValues, setValue } = props.form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = _.range(e.target.files?.length || 0).map((i) => e.target.files?.[i]);
    if (!newFiles) {
      return;
    }
    const currentFiles = getValues()[props.name] as File[];
    const files = [...currentFiles, ...newFiles];
    setValue(props.name, files as any);
  };

  const files = watch(props.name) as File[];

  const onDelete = (name: string) => {
    const currentFiles = getValues()[props.name] as File[];
    const idx = currentFiles.findIndex((f) => f.name === name);
    const files = [...currentFiles.slice(0, idx), ...currentFiles.slice(idx + 1)];
    setValue(props.name, files as any);
  };

  return (
    <Box>
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        add
        <input onChange={onChange} accept="*/*" type="file" hidden />
      </Button>
      {files.map((f) => {
        return <FileCard key={f.name} file={f} onClick={onDelete} />;
      })}
    </Box>
  );
};
