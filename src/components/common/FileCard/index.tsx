import React from "react";
import { Avatar, Card, CardHeader, css, IconButton } from "@mui/material";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { ImageDialog } from "@/components/common";

interface Props {
  file: File
  onClick: (name: string) => void
}

const imageAvatarStyle = css`
  cursor: pointer;
`;

export const FileCard = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const onDialogOpen = () => {
    setOpen(true);
  };

  const onDialogClose = () => {
    setOpen(false);
  };

  let FileAvatar = (
    <Avatar>
      <FileIcon />
    </Avatar>
  );
  if (props.file.type.startsWith("image/")) {
    const url = URL.createObjectURL(props.file);
    FileAvatar = <Avatar src={url} onClick={onDialogOpen} css={imageAvatarStyle} />;
  }

  const onClick = () => {
    props.onClick(props.file.name);
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={FileAvatar}
          action={
            <IconButton onClick={onClick}>
              <DeleteIcon />
            </IconButton>
          }
          title={props.file.name}
        />
      </Card>
      <ImageDialog open={open} file={props.file} onClose={onDialogClose}></ImageDialog>
    </>
  );
};
