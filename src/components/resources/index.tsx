import React from "react";
import {FieldValues, UseFormReturn} from "react-hook-form";
import yup from "yup";

export * from "./EditableResourceDialog";
export * from "./ResourceDialog";
export * from "./ResourceList";

export interface Field<R extends FieldValues> {
  name: Extract<keyof R, string>
  label: string
  schema: yup.Schema
  component: (field: { name: Extract<keyof R, string>; label: string }, form: UseFormReturn<R>) => React.ReactElement
  valueGetter?: (value: any) => string
}
