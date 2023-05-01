import React from "react";
import {
  Box,
  css,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { GridColDef } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { DialogCloseButton } from "@/components/common";

interface Field<R extends FieldValues> extends Pick<GridColDef<R>, "valueGetter"> {
  name: Extract<keyof R, string>
  label: string
}

interface Props<R extends FieldValues> {
  fields: Field<R>[]
  resource?: R
  title: string
  onClose: () => void
}

const buttonStyle = css`
  position: absolute;
  margin: 10px 8px;
`;

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
                  value = "";
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
