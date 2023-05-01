import React from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const SecretTextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function SecretTextField(
  props,
  ref
) {
  const [showPassword, setShowPassword] = React.useState(false);
  const onClick = () => setShowPassword((show) => !show);

  return (
    <TextField
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={onClick} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
});
