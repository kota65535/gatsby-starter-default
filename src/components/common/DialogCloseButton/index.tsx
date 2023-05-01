import React from "react";
import { Box, css, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  onClose: () => void
}

const buttonStyle = css`
  position: absolute;
  margin: 10px 8px;
`;

export const DialogCloseButton = (props: Props) => {
  return (
    <Box display="flex" flexDirection="row-reverse">
      <IconButton onClick={props.onClose} css={buttonStyle}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
